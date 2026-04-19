pipeline {
    agent any

    // Tools 
    tools {
        nodejs 'NodeJS-25'
    }

    // Environment Variables 
    environment {
        BASE_URL        = 'https://fakestoreapi.com'
        TEST_USERNAME   = credentials('TEST_USERNAME')
        TEST_PASSWORD   = credentials('TEST_PASSWORD')
        CI              = 'true'
    }

    // Options 
    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    stages {

        // Stage 1: Checkout 
        stage('Checkout') {
            steps {
                echo '=== Checking out source code ==='
                checkout scm
                sh 'git log --oneline -3'
            }
        }

        //  Stage 2: Install 
        stage('Install Dependencies') {
            steps {
                echo '=== Installing npm packages ==='
                sh 'npm ci'

                echo '=== Installing Playwright browsers ==='
                sh 'npx playwright install chromium'
            }
        }

        //  Stage 3: API Tests
        stage('API Tests') {
            steps {
                echo '=== Running API Tests ==='
                sh '''
                    npx playwright test tests/api/ \
                        --project=API \
                        --reporter=list,junit
                '''
            }
            post {
                always {
                    junit allowEmptyResults: true,
                          testResults: 'reports/junit-results.xml'
                }
            }
        }

        // Stage 4: UI Tests 
        stage('UI Tests') {
            steps {
                echo '=== Starting local server and running UI Tests ==='
                sh '''
                    npx http-server . -p 3000 &
                    sleep 3
                    npx playwright test tests/ui/ \
                        --project=chromium \
                        --reporter=list,junit
                '''
            }
            post {
                always {
                    junit allowEmptyResults: true,
                          testResults: 'reports/junit-results.xml'
                }
            }
        }

        // Stage 5: Generate Reports 
        stage('Reports') {
            steps {
                echo '=== Generating Reports ==='
                sh 'npx allure generate allure-results -o allure-report --clean'
            }
            post {
                always {
                    // Playwright HTML Report
                    publishHTML(target: [
                        allowMissing:          false,
                        alwaysLinkToLastBuild: true,
                        keepAll:               true,
                        reportDir:             'playwright-report',
                        reportFiles:           'index.html',
                        reportName:            'Playwright Report',
                    ])

                    // Allure Report
                    allure([
                        includeProperties: false,
                        jdk:               '',
                        results:           [[path: 'allure-results']],
                        reportBuildPolicy: 'ALWAYS',
                        report:            'allure-report',
                    ])
                }
            }
        }
    }

    // Post Pipeline 
    post {
        success {
            echo '✅ Pipeline passed — all tests green!'
        }
        failure {
            echo '❌ Pipeline failed — check the report for details'
        }
        always {
            echo '=== Pipeline finished ==='
        }
    }
}