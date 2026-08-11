export type Checkout = {
  url: string;
  reference: string;
};

export interface PaymentProvider {
  createCheckout(input: {
    productId: string;
    userId: string;
    returnUrl: string;
  }): Promise<Checkout>;
  verifyWebhook(request: Request): Promise<boolean>;
}

export class PaymentProviderNotConfiguredError extends Error {
  constructor() {
    super("O checkout será liberado assim que o provedor oficial for conectado.");
  }
}
