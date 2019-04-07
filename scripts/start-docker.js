import cp from 'child_process';
import 'dotenv/config';
import config from 'app/config'

console.log('==== Building docker image ====')
cp.execSync('docker build -t baas/api-gateway:dev0 .', {stdio: 'inherit'})

console.log('==== Killing old container ===');
const containerId = cp.execSync('docker container ls --filter ancestor=baas/api-gateway:dev0 --format "{{.ID}}"').toString().trim();
if (containerId) {
    console.log(`Killing container ${containerId}`);
    cp.execSync(`docker container stop ${containerId}`, {stdio: 'inherit'});
    cp.execSync(`docker container rm ${containerId}`, {stdio: 'inherit'});
    setTimeout(function(){}, 5000)
} else {
    console.log('Did not find an old container')
}

console.log('==== Running the docker image ====')
const port = config.port || 3000
cp.execSync(`docker run -p ${port}:3000 -d baas/api-gateway:dev0`, {stdio: 'inherit'})

// Test connection
var ip = "localhost";
if ((process.env.DOCKER_ON_MINIKUBE || 'false') == 'true') {
    ip = (cp.execSync('minikube ip').toString().trim())
}

const url = `http://${ip}:${port}/users/test`;
console.log(`Testing connection to ${ip}`)

for (var i = 0; i < 3; i++) {
    console.log(`Attempt ${i}`);
    setTimeout(function(){}, 5000)
    try {
        cp.execSync('curl -i ' + url, {stdio: 'inherit'});
        break;
    } catch (err) {
        console.log(`Not connected: ${err}`);
    }
}
console.log('Endpoint: ' + url);

console.log('Opening browser')
if (process.platform === "win32") {
    cp.exec('start ' + url);
} else {
    cp.exec('open ' + url);
}