import re
regex = (r"^([a-z0-9\.\-\_]+)@([a-z]+)(\.[a-z]{2,})(\.[a-z]{2,})?$")
print(re.match(regex,'lucas@hotmail.com.br').group(1)
      
)



#// +: um ou mais caracteres 
#// ?: zero ou mais caracteres 
#// []: conjunto de caracteres
#// ^: inicio da string
#// $: fim da string
#// |: ou
#// (): agrupamento
#// \: escape ou expressão literal
#//