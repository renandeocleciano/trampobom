import { Request, Response } from "express";

interface ICustomRequest extends Request {
    session: any;
    file: any;
}

export { ICustomRequest, Response }