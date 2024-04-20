pipeline {

  agent any
    environment {
        // Define the email recipient address as an environment variable
           MAIL_ID = 'rohit.d@getster.tech'  // Change your mail ID here example:chenna.m@getster.tech
           app_id = 'u21'
    }

    post {
        always {
            echo 'These actions run regardless of build status.'
            // Add your post-build actions that always run here
            emailext (
                subject: 'Your Frontend Prodution Build Started Notification',
                body: 'Your Frontend Prodution  build was started.',
                to: "${MAIL_ID}",
                mimeType: 'text/html',
                attachLog: true,  // Attach the build log to the email
                from: 'jenkins@getster.tech'  // Use the fully qualified sender address
            )
        }
        success {
            echo 'Your Frontend Prodution Build succeeded! Sending email notification...'
            emailext (
                subject: 'Your Frontend Prodution Build Success Notification',
                body: 'Your Frontend Prodution  build was successful.',
                to: "${MAIL_ID}",
                mimeType: 'text/html',
                attachLog: true,  // Attach the build log to the email
                from: 'jenkins@getster.tech'  // Use the fully qualified sender address
            )
        }
        failure {
            echo 'Your Frontend Prodution  Build failed! Sending email notification...'
            emailext (
                subject: 'Your Frontend Prodution Build Failure Notification',
                body: 'Your Frontend Prodution  build has failed. Please investigate.',
                to: "${MAIL_ID}",
                mimeType: 'text/html',
                attachLog: true,  // Attach the build log to the email
                from: 'jenkins@getster.tech'  // Use the fully qualified sender address
            )
        }
       aborted {
            echo 'Your Frontend Prodution Build aborted! Sending abort notification...'
            emailext (
                subject: 'Your Frontend Prodution Build Aborted Notification',
                body: 'Your Frontend Prodution build has been aborted.',
                to: "${MAIL_ID}",
                mimeType: 'text/html',
                attachLog: true,
                from: 'jenkins@getster.tech'
            )
        }
    }

   stages {
        stage('Approval') {
            steps {
                timeout(time: 30, unit: 'MINUTES') { // Set a timeout of 5 minutes for approval
                    input(
                        id: 'userInput',
                        message: 'Please approve to proceed with deployment',
                        submitter: 'admin'
                    )
                }
            }
        }
    stage('Build') {
      steps {
        sh 'yarn'
        sh 'npm install ng2-ckeditor --force'
        sh 'npx ng build --configuration=production'
         }
    }
    stage('Dockerfile') {
      steps {
          dir('dist'){
        writeFile file: 'Dockerfile', text: '''
          FROM nginx:latest
          WORKDIR /usr/share/nginx/html
          COPY . .
          EXPOSE 80
          RUN nginx
        '''
         }
      }
    }
stage('dist') {
    steps {
        dir('dist') {
                        writeFile file: "${app_id}.sh", text: '''
                            pattern="'(?<=:v)\\d+'"
                            file="${app_id}/${app_id}.yaml"
                            image="${app_id}"
                            current_version=$(ssh root@49.50.69.123 -p2235 "grep -oP \$pattern /root/getster-apps/\$file")
                            new_version=$(echo \$current_version | awk -F. -v OFS=. '{++\$NF; print}')
                            new_version="v\$new_version"
                            sudo docker build . -t ghcr.io/imagesgetstertech/${app_id}:\$new_version
                            sudo docker push ghcr.io/imagesgetstertech/${app_id}:\$new_version
                            ssh root@49.50.69.123 -p2235 "sed -i 's|image: ghcr.io/imagesgetstertech/\$image:.*|image: ghcr.io/imagesgetstertech/\$image:\$new_version|g' /root/getster-apps/${app_id}/${app_id}.yaml"
                            ssh root@49.50.69.123 -p2235 "kubectl apply -f /root/getster-apps/${app_id}/${app_id}.yaml"
                            ssh root@49.50.69.123 -p2235 "kubectl get pod | grep ${app_id}"
                        '''
            }
        }

  }

     stage('run'){
         steps{
          dir('dist'){
              sh "chmod +x ${app_id}.sh"
              sh "./${app_id}.sh"
          }

         }
        }
  }
}
