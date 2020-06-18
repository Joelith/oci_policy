## Unofficial OCI Policy Editor
Source code for the unofficial OCI Policy Editor. 

Feel free to take this code and deploy on your own server. In theory you could extend this to actually grab your group and compartment names from your OCI API and even automatically save your policies into OCI. To do that you'd need to create a backend that can talk to the OCI REST APIs. Unfortunately they require your private key so requests can be signed, so it's not possible to do that through this client-side only code. 

### Deployment

To deploy, copy to your server and run 'yarn start'. A deployment script using pm2 and serve is available to run more permanently. 

### Disclaimer

This code is not endorsed or approved by Oracle Corporatation and is provided as-is. It may not reflect the current OCI Policy API and no guarantee is provided as to it's accuracy. 

