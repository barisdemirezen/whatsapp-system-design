#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5003
ENV ASPNETCORE_URLS=http://*:5003

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["receiver-api/receiver-api.csproj", "receiver-api/"]
COPY ["receiver-api.service/receiver-api.service.csproj", "receiver-api.service/"]
RUN dotnet restore "receiver-api/receiver-api.csproj"
COPY . .
WORKDIR "/src/receiver-api"
RUN dotnet build "receiver-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "receiver-api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "receiver-api.dll"]