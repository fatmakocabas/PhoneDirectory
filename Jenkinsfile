pipeline {
    
    agent any
    //agent { label 'jenkins-agent-node-jdk'} 
    
    tools {nodejs "nodejs" }
   

    stages {
        // stage('Repository Check') {
        //     //agent { label 'jenkins-agent-node-jdk'} 
        //     steps {
        //         script {
        //             sh 'git init && git clean -df'
        //             git branch: 'test', 
        //                 credentialsId: 'Ayildiz1903', 
        //                 url: 'https://github.com/fatmakocabas/PhoneDirectory.git'
        //         }
        //     }
        // }
     
        stage('NPM Install') {
            //agent { label 'jenkins-agent-node-jdk'} 
            steps {
                withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            //agent { label 'jenkins-agent-node-jdk'}
            steps {
                sh 'npm run ng build --prod --aot --sm --progress=false'
            }
        }
        stage('Archive') {
            //agent { label 'jenkins-agent-node-jdk'}
            steps {
                sh 'tar -cvzf dist.tar.gz --strip-components=1 dist'
                archive 'dist.tar.gz'
            }
        }
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DockerRegistry', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker login -u $USERNAME --password $PASSWORD'
                }
            }
        }
        stage('build docker nginx image and deploy dist file') {
            steps{
                sh 'docker build -t fatmakocabas/phone-ui:v4 .'
                sh 'docker push'
            }
        }
        
        // stage('Deploy docker container') {
        //     steps {
        //         sh "docker rm -f phone-ui-test2 "
        //         sh "docker run --name phone-ui-test2 -d  -p 8098:80 ayildiz89/phone-ui:v8"
        //     }
        // }
          stage('Initialize db') {
            steps {
                dir (kubernates_app/phone_db){
                    sh "kubectl apply -f sql-deployment.yml && kubectl expose deployment mssql-deployment-jenkins --name mssql-service-jenkins --type=NodePort --target-port=1433 --port=1433"
                }
            }
        }
         stage('Deploy api') {
            steps {
                dir (kubernates_app/phone_api){
                    sh "kubectl apply -f deployment_phone_api.yaml && kubectl expose deployment phone-api-jenkins-deployment --name phone-api-jenkins-service --type=NodePort --target-port=80 --port=80 -o yaml"
                }
            }
        }
         stage('Deploy ui') {
            steps {
                dir (kubernates_app/phone_ui){
                    sh "kubectl apply -f phone-deployment-ui.yml && kubectl expose deployment phone-ui-jenkins --name phone-ui-jenkins-service --type=NodePort --target-port=80 -o yaml"
                }
            }
        }
    }
}