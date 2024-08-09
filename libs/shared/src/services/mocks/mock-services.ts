/* eslint-disable @typescript-eslint/no-unused-vars */
export const getOrders = async (): Promise<any[]> => {
  //some 3rd party api call to fetch orders
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '8a0ee20d',
          name: 'Order1',
        },
        {
          id: '50df0380',
          name: 'Order2',
        },
        {
          id: 'f8071033',
          name: 'Order3',
        },
      ]);
    }, 3000);
  });
};

export const createPdf = async (orders: any[]): Promise<any> => {
  //logic for creating pdf invoice
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        filePath: 'path-to-file.pdf',
        orders,
      });
    }, 1000);
  });
};

export const sendEmail = async (pdfPath?: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email_status: 'sent',
        to: 'random_email@google.com',
      });
    }, 400);
  });
};
