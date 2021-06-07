import express, { Router } from "express";


export abstract class ARouter {
    protected readonly router = express.Router();


    public getRouter(): Router {
        return this.router;
    }
}