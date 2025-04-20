import { PaymentDomain, PaymentDto, RequestPayment } from "../definition/payment.definition";
import { logEnd, logInit } from "../service/util.service";

const CLAZZ = 'PaymentMapper';

function _toDomain(req: RequestPayment, debtorAccountId: string): PaymentDomain {
    const METHOD = 'toDomain';
    logInit(CLAZZ, METHOD, req);
    const domain = {
        endToEnd: req.endToEndId,
        instrument: req.localInstrument,
        cnpjInitiator: req.cnpjInitiator,
        paymenteAmount: req.payment.amount,
        transactionId: req.transactionIdentification!,
        description: req.remittanceInformation!,
        creditorIspb: req.creditorAccount.ispb,
        creditorAgency: req.creditorAccount.issuer,
        creditorAccount: req.creditorAccount.number,
        creditorAccountType: req.creditorAccount.accountType,
        debtorAccountId: debtorAccountId
    } as PaymentDomain;
    logEnd(CLAZZ, METHOD, domain);
    return domain;
}

function _toDto(req: PaymentDomain): PaymentDto {
    const METHOD = 'toDto';
    logInit(CLAZZ, METHOD, req);
    const domain = {
        paymentId: req.id,
        endToEndId: req.endToEnd,
        creationDateTime: String(req.dateCreate),
        statusUpdateDateTime: String(req.dateUpdate),
        status: req.status,
        localInstrument: req.instrument,
        cnpjInitiator: req.cnpjInitiator,
        payment: {
            amount: req.paymenteAmount,
            currency: 'BRL'
        },
        transactionIdentification: req.transactionId,
        remittanceInformation: req.description,
        creditorAccount: {
            ispb: req.creditorIspb,
            issuer: req.creditorAgency,
            number: req.creditorAccount,
            accountType: req.creditorAccountType
        },
    } as PaymentDto;
    logEnd(CLAZZ, METHOD, domain);
    return domain;
}

export const PaymentMapper = {
    toDomain: _toDomain,
    toDto: _toDto
}