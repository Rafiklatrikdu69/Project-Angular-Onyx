# Étape de construction (Build)
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src

# Copie des fichiers du projet pour restaurer les dépendances
COPY ["app-image-backend/app-image-backend.csproj", "app-image-backend/"]
RUN dotnet restore "app-image-backend/app-image-backend.csproj"

# Copie du reste des fichiers et construction de l'application
COPY . .
WORKDIR "/src/app-image-backend"
RUN dotnet build "app-image-backend.csproj" -c Release -o /app/build

# Étape de publication
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS publish
WORKDIR /app
COPY --from=build /app/build .

# Configuration finale
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final
WORKDIR /app
COPY --from=publish /app .

# Commande d'entrée pour exécuter l'application
ENTRYPOINT ["dotnet", "app-image-backend.dll"]
