import express, { Router } from "express";


export default abstract class ARouter {
    protected readonly router = express.Router();


    public getRouter(): Router {
        return this.router;
    }
}