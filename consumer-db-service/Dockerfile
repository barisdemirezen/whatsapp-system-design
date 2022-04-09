#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5001

ENV ASPNETCORE_URLS=http://+:5001

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["consumer-db-service/consumer-db-service.csproj", "consumer-db-service/"]
COPY ["consumer-db-service.service/consumer-db-service.service.csproj", "consumer-db-service.service/"]
RUN dotnet restore "consumer-db-service/consumer-db-service.csproj"
COPY . .
WORKDIR "/src/consumer-db-service"
RUN dotnet build "consumer-db-service.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "consumer-db-service.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "consumer-db-service.dll"]