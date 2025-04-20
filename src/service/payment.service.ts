'use server';

import { PaymentDto, RequestPayment } from '../definition/payment.definition';
import { PaymentMapper } from '../mapper/payment.mapper';
import { getAccoutDomainById } from '../repository/account.repository';
import { createPaymentDomain } from '../repository/payment.repository';
import { patchBalanceDtoByAccountId } from './balance.service';
import { logEnd, logInit, throwError } from './util.service';

const CLAZZ = 'PaymentsService';

export async function createPayment(requestPayment: RequestPayment, account_id: string): Promise<PaymentDto> {
    const METHOD = 'createPayment';
    try {
        logInit(CLAZZ, METHOD, { requestPayment: requestPayment, account_id: account_id });
        // TODO: validação do requestPayment
        await patchBalanceDtoByAccountId(account_id, requestPayment.payment.amount);
        const paymentDomainReq = PaymentMapper.toDomain(requestPayment, account_id);
        const paymentDomain = await createPaymentDomain(paymentDomainReq);
        const accountDomain = await getAccoutDomainById(account_id);
        const response = PaymentMapper.toDto(paymentDomain);
        response.debtorAccount = {
            ispb: '00360305', // TODO: vir de uma variável de ambiente
            issuer: accountDomain.agency,
            number: accountDomain.number + '-' + accountDomain.checkDigit,
            accountType: accountDomain.type
        }
        logEnd(CLAZZ, METHOD, response);
        return response;
    } catch (error) {
        // TODO: precisa fazer o 'roolback' patchBalanceDtoByAccountId
        // TODO: precisa fazer o 'roolback' patchPaymentDomainById
        return throwError(error as Error, CLAZZ, METHOD);
    }
}
