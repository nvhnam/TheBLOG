# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Use a wildcard to copy the jar and rename it to app.jar for a stable ENTRYPOINT
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080 

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
