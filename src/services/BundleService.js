import Sequelize, { where } from 'sequelize'

import connection from '../database/conn'
import Bundle from '../models/Bundle'

export default class BundleService {
  /**
   * Get a bundles.
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
  static async fetchBundleofferings({ vendor_ID, company_ID, bundle_ID, componentType }) {
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

  /**
   * Get a bundle componens.
   *
   * @param   {Number}  vendor_ID
   * @param   {String}  company_ID
   * @param   {Number}  bundle_ID
   * @param   {String}  componentType
   * @returns {Promise<offerings|null>}
   */
  static async fetchBundleComponents({ vendor_ID, company_ID, bundle_ID, componentType }) {
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
  static async fetchLatestBundle() {
    try {
      const bundle = await Bundle.findOne({
        order: [
          ['bundle_ID', 'DESC'] // Use 'ASC' for ascending
        ],
        raw: true
      })

      return bundle
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
  static async buildNewBundle(data) {
    try {
      const { vendor_ID, company_ID, bundle_ID, bundleName, bundleDesc } = data

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
  static async saveBundleOfferings(data) {
    try {
      const { vendor_ID, company_ID, bundle_ID, selectedOfferingIds } = data

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
  static async editBundle(data) {
    try {
      const { bundle_ID, bundleName, bundleDesc } = data

      const bundle = await Bundle.update({ bundle_name: bundleName, bundle_desc: bundleDesc }, { where: { bundle_ID } })

      return bundle
    } catch (err) {
      throw err
    }
  }
}
