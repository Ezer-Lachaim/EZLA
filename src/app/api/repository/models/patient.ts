/* tslint:disable */
/* eslint-disable */
/**
 * Ezer LaChayim API
 * Redis' social hackathon June 2023 - bridge between volunteers and those in need of rides to the hospital 
 *
 * OpenAPI spec version: 1.0.0
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface Patient
 */
export interface Patient {
    /**
     * 
     * @type {string}
     * @memberof Patient
     */
    patientId?: string;
    /**
     * 
     * @type {string}
     * @memberof Patient
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof Patient
     */
    lastName?: string;
    /**
     * 
     * @type {number}
     * @memberof Patient
     */
    hospitalId?: number;
    /**
     * 
     * @type {string}
     * @memberof Patient
     */
    hospitalBuilding?: string;
    /**
     * 
     * @type {string}
     * @memberof Patient
     */
    hospitalDept?: string;
}
