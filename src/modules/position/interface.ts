
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
        positionId: string;
        name: string;
        description: string | null;
    }[];
}

export interface Update{
    positionId: string;
    name: string;
    description: string | null;
  }
  