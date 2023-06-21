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
import { Driver } from './driver';
/**
 * 
 * @export
 * @interface Ride
 */
export interface Ride {
    /**
     * 
     * @type {string}
     * @memberof Ride
     */
    destination?: string;
    /**
     * 
     * @type {string}
     * @memberof Ride
     */
    origin?: string;
    /**
     * 
     * @type {number}
     * @memberof Ride
     */
    cellphone?: number;
    /**
     * 
     * @type {string}
     * @memberof Ride
     */
    state?: RideStateEnum;
    /**
     * 
     * @type {number}
     * @memberof Ride
     */
    passengerCount?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Ride
     */
    specialRequest?: Array<RideSpecialRequestEnum>;
    /**
     * 
     * @type {string}
     * @memberof Ride
     */
    requestTimeStamp?: string;
    /**
     * 
     * @type {number}
     * @memberof Ride
     */
    destinationArrivalTime?: number | null;
    /**
     * 
     * @type {Driver}
     * @memberof Ride
     */
    driver?: Driver;
}

/**
    * @export
    * @enum {string}
    */
export enum RideStateEnum {
    WaitingForDriver = 'WaitingForDriver',
    Booked = 'Booked',
    DriverArrived = 'DriverArrived',
    Riding = 'Riding',
    Completed = 'Completed',
    Canceled = 'Canceled'
}
/**
    * @export
    * @enum {string}
    */
export enum RideSpecialRequestEnum {
    WheelChair = 'WheelChair',
    WheelChairStorage = 'WheelChairStorage',
    BabyChair = 'BabyChair',
    KidsChair = 'KidsChair',
    AccessibleCar = 'AccessibleCar',
    PatientDelivery = 'PatientDelivery'
}

