import Sequelize, { where } from 'sequelize'

import connection from '../database/conn'
import Bundle from '../models/Bundle'
import Boom from '@hapi/boom'
import Catalog from '../models/Catalog'
import VendorService from './VendorService'

export default class BundleService {
  /**
   * Get a bundle.
   *
   * @param   {Object}  query
   * @returns {Promise<Bundle|null>}
   */
  static async fetchBundle(query = {}) {
    try {
      const bundles = await Bundle.findOne({ where: { ...query } })

      return bundles
    } catch (err) {
      throw err
    }
  }

  /**
   * Get bundles.
   *
   * @param   {Object}  query
   * @returns {Promise<Bundle|null>}
   */
  static async fetchBundles(query = {}) {
    try {
      const bundles = await Bundle.findAll({ where: { ...query } })

      return bundles
    } catch (err) {
      throw err
    }
  }

  /**
   * Get a bundle offerings.
   *
   * @param   {Number}  vendor_ID
   * @param   {String}  company
   * @param   {Number}  bundle_ID
   * @param   {String}  componentType
   * @returns {Promise<offerings|null>}
   */
  static async fetchBundleofferings(vendor_ID, company_ID, bundle_ID, componentType) {
    try {
      const offerings = await connection.query(
        `
          EXEC dbo.Deets_Get_Bundle_offerings
            @VendorID = :vendor_ID,
            @CompanyID = :company_ID,
            @BundleID = :bundle_ID,
            @ComponentType = :componentType;
        `,
        {
          replacements: { vendor_ID, company_ID, bundle_ID, componentType },
          type: Sequelize.QueryTypes.SELECT
        }
      )

      return offerings
    } catch (error) {
      throw error
    }
  }

  static async createBundlePricing(vendor_id, company_id, bundle_id, component_id) {
    try {
      const result = await connection.query(
        `
        INSERT INTO tblBundles_Pricing (Vendor_ID,Company_ID, Bundle_ID, Bundle_Component_ID)
        VALUES (:vendor_id, :company_id, :bundle_id, :component_id)
        `,
        {
          replacements: { vendor_id, company_id, bundle_id, component_id },
          type: Sequelize.QueryTypes.INSERT
        }
      )

      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Get a bundle componens.
   *
   * @param   {Number}  vendor_ID
   * @param   {String}  company_ID
   * @param   {Number}  bundle_ID
   * @param   {String}  componentType
   * @returns {Promise<offerings|null>}
   */
  static async run_Deets_Get_Components(vendor_ID, company_ID, bundle_ID, componentType) {
    try {
      const offerings = await connection.query(
        `
          EXEC dbo.Deets_Get_Components
            @VendorID = :vendor_ID,
            @CompanyID = :company_ID,
            @BundleID = :bundle_ID,
            @ComponentType = :componentType;
        `,
        {
          replacements: { vendor_ID, company_ID, bundle_ID, componentType },
          type: Sequelize.QueryTypes.SELECT
        }
      )

      return offerings
    } catch (error) {
      throw error
    }
  }

  /**
   * Get a latest bundle.
   *
   * @returns {Promise<Bundle|null>}
   */
  static async fetchLatestBundleId() {
    try {
      const bundle = await connection.query(`SELECT MAX([log_ID]) LastID FROM [tblBundles]`, {
        type: Sequelize.QueryTypes.SELECT
      })

      if (bundle && bundle.length > 0) return bundle[0].LastID
      else return 0
    } catch (err) {
      throw err
    }
  }

  /**
   * Buile a new bundle.
   *
   * @param   {Object}  data
   * @returns {Promise<Bundle|null>}
   */
  static async run_Deets_Save_New_Bundle(vendor_ID, company_ID, bundle_ID, bundleName, bundleDesc) {
    try {
      const bundle = await connection.query(
        `
              EXEC dbo.Deets_Save_New_Bundle
                @VendorID = :vendor_ID,
                @CompanyID = :company_ID,
                @BundleID = :bundle_ID,
                @Bundlename = :bundleName,
                @BundleDesc = :bundleDesc;
            `,
        {
          replacements: { vendor_ID, company_ID, bundle_ID, bundleName, bundleDesc },
          type: Sequelize.QueryTypes.SELECT
        }
      )

      return bundle
    } catch (err) {
      throw err
    }
  }

  /**
   * Save bundle offerings.
   *
   * @param   {Object}  data
   * @returns {Promise<offerings|null>}
   */
  static async run_Deets_Save_Bundle_Offerings(vendor_ID, company_ID, bundle_ID, selectedOfferingIds) {
    try {
      const offerings = await connection.query(
        `
              EXEC dbo.Deets_Save_Bundle_Offerings
                @VendorID = :vendor_ID,
                @CompanyID = :company_ID,
                @BundleID = :bundle_ID,
                @selectedOfferingIds = :selectedOfferingIds;
            `,
        {
          replacements: { vendor_ID, company_ID, bundle_ID, selectedOfferingIds },
          type: Sequelize.QueryTypes.SELECT
        }
      )

      return offerings
    } catch (err) {
      throw err
    }
  }

  /**
   * Edit bundle.
   *
   * @param   {Object}  data
   * @returns {Promise<offerings|null>}
   */
  static async updateBundle(data) {
    try {
      const { bundle_ID, bundleName, bundleDesc } = data

      const bundle = await Bundle.update({ bundle_name: bundleName, bundle_desc: bundleDesc }, { where: { bundle_ID } })

      return bundle
    } catch (err) {
      throw err
    }
  }

  /**
   * Copy bundle.
   *
   * @param   {Object}  data
   * @returns {Promise<offerings|null>}
   */
  static async copyBundle(data) {
    try {
      const { bundle_ID, vendor_ID, customerName } = data

      const currentDate = new Date().toISOString()

      const existingCompany = await Catalog.findOne({
        where: { company: customerName }
      })

      if (existingCompany) throw Boom.badRequest('Customer already exists')

      const maxLogId = await Catalog.max('catalogID')
      const company_ID = maxLogId + 1

      await Catalog.create({
        company: customerName,
        catalogID: company_ID,
        catalog: 'D' + company_ID.toString().trim(),
        catalog_dateAdded: currentDate
      })

      const bundle = await this.fetchBundle({ bundle_ID })
      if (!bundle) Boom.notFound('Bundle not found')

      const vendor = await VendorService.fetchVendor({ vendor_ID })
      if (!vendor) throw Boom.notFound('Vendor not found')

      const bundleCom = await connection.query(
        `
          EXEC dbo.Deets_COPY_Bundle
            @VendorID = :vendor_ID,
            @CompanyID = :company_ID,
            @BundleID = :bundle_ID,
            @NewCustomerName = :customerName;
        `,
        {
          replacements: {
            vendor_ID,
            company_ID,
            bundle_ID,
            customerName
          },
          type: Sequelize.QueryTypes.SELECT
        }
      )

      return bundleCom
    } catch (err) {
      throw err
    }
  }

  /**
   * fetch bundle P and L.
   *
   * @param   {Object}  data
   * @returns {Promise<result|null>}
   */
  static async fetchBundlePL(data) {
    try {
      const { vendor_ID, company_ID, bundle_ID } = data

      const result = await connection.query(
        `
          EXEC dbo.Deets_RPT_Bundle_ProfitLoss
            @VendorID = :vendor_ID,
            @CompanyID = :company_ID,
            @BundleID = :bundle_ID;
        `,
        {
          replacements: { vendor_ID, company_ID, bundle_ID },
          type: Sequelize.QueryTypes.SELECT
        }
      )

      return result
    } catch (err) {
      throw err
    }
  }

  /**
   * fetch bundle delivery coasts.
   *
   * @param   {Object}  data
   * @returns {Promise<result|null>}
   */
  static async fetchBundleDeliveryCoats(data) {
    try {
      const { vendor_ID, company_ID, bundle_ID } = data

      const result = await connection.query(
        `
          EXEC dbo.Deets_RPT_Bundle_TotalCost
            @VendorID = :vendor_ID,
            @CompanyID = :company_ID,
            @BundleID = :bundle_ID;
        `,
        {
          replacements: { vendor_ID, company_ID, bundle_ID },
          type: Sequelize.QueryTypes.SELECT
        }
      )

      return result
    } catch (err) {
      throw err
    }
  }

  /**
   * fetch bundle hours by ctg.
   *
   * @param   {Object}  data
   * @returns {Promise<result|null>}
   */
  static async fetchBundleHoursByCtg(data) {
    try {
      const { vendor_ID, company_ID, bundle_ID } = data

      const result = await connection.query(
        `
          EXEC dbo.Deets_Chart_Bundle_Hours
            @VendorID = :vendor_ID,
            @CompanyID = :company_ID,
            @BundleID = :bundle_ID;
        `,
        {
          replacements: { vendor_ID, company_ID, bundle_ID },
          type: Sequelize.QueryTypes.SELECT
        }
      )

      return result
    } catch (err) {
      throw err
    }
  }
}
