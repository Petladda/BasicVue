export interface Employee {
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  isEnable: number;
  phones: {
    phoneId: string;
    phoneNumber: string;
  }[];
  positionId: string;
  teamId: string;
  employeeId: string;
}

export interface Index {
  pageIndex: number;
  pageSize: number;
  search: {
    text: string;
  	teamId: string;
  	positionId: string;
  };
}

export interface PhoneModel {
  phoneId: string;
  phoneNumber: string;
}

export interface Create{
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  positionId: string;
  teamId: string;
  phones: PhoneModel[];
}

export interface Update{
  employeeId: string;
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  positionId: string;
  teamId: string;
  phones: PhoneModel[];
}


export interface GetDetail{
  employeeId: string;
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  positionId: string;
  teamId: string;
  phones: PhoneModel[];
}


export interface PageType {
  id: number;
  amount: number;
}

export interface Response {
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  data: {
    employeeId: string;
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth: string;
    isEnable: number;
    phones: {
      phoneId: string;
      phoneNumber: string;
    }[];
    positionId: string;
    teamId: string;
  }[];
}

export interface DropDown {
  text: string;
  value: string;
}


