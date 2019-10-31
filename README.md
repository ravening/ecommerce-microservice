Ecommerce microservice app created using Jhipster

More info in https://dev.to/deepu105/create-full-microservice-stack-using-jhipster-domain-language-under-30-minutes-4ele


Inter service communication is possible using FeignClient which takes care of JWT as well.
Look at ```InvoiceResource.java``` which uses hte FeignClient to make an api call at ```api/products```\
to get all the products from the ```store``` service.
