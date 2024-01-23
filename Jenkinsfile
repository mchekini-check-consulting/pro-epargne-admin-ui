node("ci-node") {

    stage("Checkout") {
        checkout scmGit(branches: [[name: '*/develop']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mchekini-check-consulting/pro-epargne-admin-ui']])}


    stage("Build") {
        sh "npm install"
        sh "npm run build --prod"
    }

    stage("Build Docker Image") {
        sh "sudo docker build -t pro-epargne-admin-ui ."
    }

    stage("Push Docker Image To Registry") {
        sh "sudo docker tag pro-epargne-admin-ui mchekini/pro-epargne-admin-ui:1.0"
        withCredentials([usernamePassword(credentialsId: 'mchekini', passwordVariable: 'password', usernameVariable: 'username')]) {
            sh "sudo docker login -u $username -p $password"
            sh "sudo docker push mchekini/pro-epargne-admin-ui:1.0"
            sh "sudo docker rmi mchekini/pro-epargne-admin-ui:1.0"
            sh "sudo docker rmi pro-epargne-admin-ui"
            stash include: 'docker-compose.yml', name: 'utils'
        }
    }

    node("deploy-node") {
        stage("deploy") {
            unstash 'utils'
            try {
                sh "sudo docker-compose down"
                sh "sudo docker-compose pull"
                sh "sudo docker-compose up -d"
            } catch (Exception e) {
                println "No Docker Conatainers Running"
                sh "sudo docker-compose pull"
                sh "sudo docker-compose up -d"
            }
        }
    }
}
