# Nodejs Server Example - Create Izipay payment
Server example in nodejs to create and validate the payment result of the Izipay payment provider

## Requirements
* Nodejs 18.15
* Izipay REST API authentication keys

## Setting
1. Rename the `example.env` file to `.env`
2. configure `.env`environment variables
```sh
ID_TIENDA=44532503

CLAVE_TEST=AN7sPAUn19UQ1cXL
CLAVE_PRODUCCION=

PASSWORD_TEST=testpassword_x0ZDVlzhOnkCMiSGpOQ9rLbQUlKYmunHSfI5SN54avffE
PASSWORD_PRODUCCION=

PUBLIC_KEY_TEST=44532503:testpublickey_csSdGM0KnIzIy0hYRj29NoDYjBKV6uDAfP42sIonUhG7u
PUBLIC_KEY_PRODUCCION=

CLAVE_HMAC_SHA_256_TEST=WLYdcwRkqenw7j9hgKmZU4yhQ91gnqQ36S95YwBh7ByE8
CLAVE_HMAC_SHA_256_PRODUCCION=

MODE=TEST
```
3. Instalar dependencias `npm install`
4. Ejecutar servidor local `npm run start:dev`


# Guia
Este proyecto contiene 3 servicios APIREST creados

1. http://localhost:3000/api/createPayment      => Endpoint para generar el `formToken` necesario y motrar el formulario de pago.
2. http://localhost:3000/api/validatePayment    => Endpoint que realizará la valicación de un pago exitoso.
3. http://localhost:3000/api/ipn                => Endpoint para  recibir la notificación de pago instantáneo(IPN)

### CreatePayment
**POST:** Crear FormToken  
`http://localhost:3000/api/createPayment`  
**HEADERS**
``

``
**BODY:** json
```sh
{
    amount: 5,
    currency: USD,
    customer: {
        email: "example@gmail.com",
        ...
    },
    orderId: pedido-123,
    ...
}
```

### ValidatePayment
**POST:** Verificar pago realizado
`http://localhost:3000/api/validatePayment`  
**BODY:** json  
```sh
{
    hash: "saw1c3x1c31c1sfdfae78ada8s7dasd6as6d7d7as6",
    hashKey: "sha256_hmac",
    hashAlgorith: "sha256_hmac"
    clientAnswer:{SHOPID:12345678,ORDERSTATUS:PAID,...}
}
```

### IPN
**POST:** Recibir notificación de pago instantáneo(IPN)
```sh
{
    hash: "saw1c3x1c31c1sfdfae78ada8s7dasd6as6d7d7as6",
    hashKey: "password",
    hashAlgorith: "sha256_hmac"
    clientAnswer:{SHOPID:12345678,ORDERSTATUS:PAID,...}
}
```

Para más información acerca del formulario de Izipay consulte su documentación [Aquí](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/javascript/)
