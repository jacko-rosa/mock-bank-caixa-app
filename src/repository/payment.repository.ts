import { db } from "@vercel/postgres";
import { PaymentDomain } from "../definition/payment.definition";
import { logEnd, logInit } from "../service/util.service";

const CLAZZ = 'PaymentsRepository';

export async function createPaymentDomain(req: PaymentDomain): Promise<PaymentDomain> {
    const METHOD = 'createPaymentDomain';
    logInit(CLAZZ, METHOD, req)
    const connection = await db.connect();

    const data = await connection.sql`
        INSERT INTO "payment" (
            "endToEnd",
            "cnpjInitiator",
            "paymentAmount",
            "transactionId",
            "description",
            "creditorIspb",
            "creditorAgency",
            "creditorAccount",
            "creditorAccountType",
            "debtorAccountId"
        )
        VALUES (
            ${req.endToEnd},
            ${req.cnpjInitiator},
            ${req.paymenteAmount},
            ${req.transactionId},
            ${req.description},
            ${req.creditorIspb},
            ${req.creditorAgency},
            ${req.creditorAccount},
            ${req.creditorAccountType},
            ${req.debtorAccountId}
            )
        RETURNING *;`;

    const response = data.rows[0] as PaymentDomain;

    logEnd(CLAZZ, METHOD, response);
    return response;
}
