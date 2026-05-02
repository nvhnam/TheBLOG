# Build stage
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Use a wildcard to copy the jar and rename it to app.jar for a stable ENTRYPOINT
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080 

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
