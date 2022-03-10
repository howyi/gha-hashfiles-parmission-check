glob = require('@actions/glob')
const { execSync } = require('child_process')

const p = new Promise(async (resolve, reject) => {

    console.log(execSync('mkdir deniedDir').toString())
    console.log(execSync('cp package-lock.json deniedDir').toString())
    console.log(execSync('chmod 000 deniedDir').toString())

    try {

        const matchPatterns = '**/package-lock.json'

        console.log(`$ls -la ${matchPatterns}`)
        console.log(execSync(`ls -la ${matchPatterns}`).toString())

        console.log(`%ls -la ${matchPatterns}`)
        console.log(execSync(`ls -la ${matchPatterns}`, {shell: '/bin/zsh'}).toString())

        console.log(`@actions/glob ${matchPatterns}`)
        const globber = await glob.create(matchPatterns)
        for await (const file of globber.globGenerator()) {
            console.log(file)
        }
    } catch (e) {
        console.error(e)
    }

    console.log(execSync('chmod 777 deniedDir').toString())
    console.log(execSync('rm -rf deniedDir').toString())
});

p.then()