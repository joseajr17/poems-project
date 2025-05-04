# Etapa de build usando imagem oficial do Maven com JDK 17
FROM maven:3.8.6-openjdk-17 AS build

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa de execução usando JDK slim
FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
