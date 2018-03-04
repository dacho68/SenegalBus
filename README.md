# SenegalBus
## Installation

* Need node version 6 or higher
    * Node --version
* Install AspCore SPA template
    * dotnet new --install Microsoft.AspNetCore.SpaTemplates::*
* Verify if the SignalR is install
    * dotnet new -l
* First time you create the offline config
    * dotnet restore
* Install packages
    * npm install
* Install SignalR 
	* dotnet add package Microsoft.AspNetCore.SignalR --version 1.0.0-alpha2-final 

## Open in VS 2017
* start SenegalBus.csproj
