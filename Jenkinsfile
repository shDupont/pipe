pipeline {
    agent any

    tools {
        nodejs 'NodeJS 14.x' // Usar o NodeJS configurado nas Ferramentas Globais do Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/shDupont/pipe.git', branch: 'main'
            }
        }
        stage('Build') {
            steps {
                script {
                    bat 'npm install'
                    bat 'npm list --depth=0' // Lista os pacotes de primeiro nível
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Executa o teste com o repórter JUnit
                    bat 'npx mocha --reporter mocha-junit-reporter --reporter-options mochaFile=./test-results.xml'
                }
            }
        }
        stage('Deploy to Staging') {
            steps {
                script {
                    // Corrigido: Especificando diretório com a barra no final
                    bat 'xcopy /s /e /y .\\src \\path\\to\\staging\\server\\'
                }
            }
        }
    }

    post {
        always {
            junit '**/test-results.xml'
            archiveArtifacts artifacts: '**/src/*.js', allowEmptyArchive: true
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
