
export interface CreateType {
    name: string;
    description: string | null;
}

export interface IndexType {
    pageIndex: number;
    pageSize: number;
    search: {
        text: string;
    }
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
        teamId: string;
        name: string;
        description: string | null;
    }[];
}

export interface Update{
    teamId: string;
    name: string;
    description: string | null;
  }
  