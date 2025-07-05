export interface IBook {
  _id: string
  title: string
  author: string
  genre: string
  isbn: string
  description: string
  copies: number
  available: boolean

}

export interface IBorrowRecord {
  id: string
  book: IBook
  isbn: string
  quantity: number
  dueDate: string
  createdAt: string
  totalQuantity: number
}

export interface ICreateBookData {
  title: string
  author: string
  genre: string
  isbn: string
  description: string
  copies: number
  available?: boolean
}
export interface IUpdateBookData {
  title?: string
  author?: string
  genre?: string
  isbn?: string
  description?: string
  copies: number
  available?: boolean
}

export interface IBorrowBookData {
  book: string
  quantity: number
  dueDate: string
}

export interface IApiError {
    status?: number;
    data?: {
        success?: boolean;
        message?: string;
        error?: any;
    };
}
