FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY . .
RUN dotnet restore "PhurmanAndTheBoiz.sln"
WORKDIR "/src/PhurmanAndTheBoiz.API"
RUN dotnet build "PhurmanAndTheBoiz.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "PhurmanAndTheBoiz.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "PhurmanAndTheBoiz.API.dll"]
