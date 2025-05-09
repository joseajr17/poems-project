FROM ubuntu:latest AS builder

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install -DskipTests


# Segunda etapa: imagem mais enxuta para rodar o app
FROM openjdk:21-jdk-slim

EXPOSE 8080

COPY --from=build /target/backend-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
