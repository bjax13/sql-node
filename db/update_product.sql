update products
set productDescription = $2
where productId = $1
returning productId
