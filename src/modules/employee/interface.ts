export interface Employee {
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  position: string;
  team: string;
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
    phones: {
      phoneId: string;
      phoneNumber: string;
    }[];
    position: string;
    team: string;
  }[];
}

export interface DropDown {
  text: string;
  value: string;
}
