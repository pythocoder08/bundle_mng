import Boom from '@hapi/boom'
import Sequelize from 'sequelize'

import connection from '../database/conn'
import Vendor from '../models/Vendor'
import VendorCompany from '../models/VendorCompany'

export default class VendorService {
  /**
   * Get a vendors.
   *
   * @param   {Object}  query
   * @returns {Promise<Vendor|null>}
   */
  static async fetchVendors(query = {}) {
    try {
      const vendors = await Vendor.findAll({ where: { ...query } })

      return vendors
    } catch (err) {
      throw err
    }
  }

  /**
   * Get a vendor.
   *
   * @param   {Object}  query
   * @returns {Promise<Vendor|null>}
   */
  static async fetchVendor(query = {}) {
    try {
      const vendor = await Vendor.findOne({ where: { ...query }, raw: true })

      return vendor
    } catch (err) {
      throw err
    }
  }

  /**
   * Get a vendor by user.
   *
   * @param   {String}  company
   * @returns {Promise<Vendor|null>}
   */
  static async fetchVendorByUser(company) {
    try {
      const vendorCom = await VendorCompany.findOne({
        where: {
          vendor_company_link: company
        },
        raw: true
      })

      const vendor = await Vendor.findOne({
        where: {
          vendor_ID: vendorCom.vendor_ID
        }
      })

      return vendor
    } catch (err) {
      throw err
    }
  }

  /**
   * Get a vendors by vendor_ID.
   *
   * @param   {String}  vendor_ID
   * @returns {Promise<Vendor|null>}
   */
  static async fetchVendorCompanyLinks(vendor_ID) {
    try {
      const vendorComs = await VendorCompany.findAll({
        where: {
          vendor_ID
        }
      })

      return vendorComs
    } catch (err) {
      throw err
    }
  }

  /**
   * Get a vendors prod by user.
   *
   * @param   {String}  vendor_ID
   * @param   {String}  company_ID
   * @returns {Promise<Vendor|null>}
   */
  static async fetchStoredProc(vendor_ID, company_ID) {
    try {
      const result = await connection.query(
        'EXEC dbo.Deets_Customer_Concentration_Chart @VendorID = :vendor_ID, @CompanyID = :company_ID',
        {
          replacements: { vendor_ID, company_ID },
          type: Sequelize.QueryTypes.SELECT
        }
      )

      return result
    } catch (error) {
      console.error('Error executing stored procedure:', error)
      throw error
    }
  }

  /**
   * Get a col chart datavendorID.
   *
   * @param   {String}  vendor_ID
   * @returns {Promise<Vendor|null>}
   */
  static async fetchStoredCol(vendor_ID) {
    try {
      const result = await connection.query('EXEC dbo.Deets_RPT_Vendor_Bundle_Price_Margin @VendorID = :vendor_ID', {
        replacements: { vendor_ID },
        type: Sequelize.QueryTypes.SELECT
      })

      return result
    } catch (error) {
      throw error
    }
  }
}
