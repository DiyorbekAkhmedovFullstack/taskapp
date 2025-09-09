# Stage 1: Build Angular frontend
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --legacy-peer-deps
COPY frontend/ ./
RUN npm run build --configuration=production

# Stage 2: Build Spring Boot backend
FROM eclipse-temurin:17-jdk AS backend-build
WORKDIR /app
COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn
COPY src ./src
# Copy built frontend files
COPY --from=frontend-build /app/frontend/dist/frontend/browser/ ./src/main/resources/static/
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

# Stage 3: Runtime
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]