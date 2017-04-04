import * as xmpp from './xmpp/xmpp'
import assert from 'assert'
const NS = 'hippware.com/hxep/http-file'
import { action, autorunAsync, when } from 'mobx'
import autobind from 'autobind-decorator'
import { settings } from '../globals'
import File from '../model/File'
import factory from '../factory/fileFactory'
@autobind
export class FileStore {
    @action create = (id: string) => {
        return factory.create(id)
    }

    async downloadFile (url) {
        console.log('DOWNLOADING FILE', url)
        assert(url, 'URL should be defined')
        const folder = tempDir + '/' + url.split('/').slice(-1)[0]
        const fileName = folder + '/' + 'file.jpeg'
        let res = {uri: fileName, contentType: 'image/jpeg'}
        if (await fileExists(fileName)) {
            res.cached = true
            console.log('CACHED!', fileName)
        } else {
            await fileExists(folder) || await mkdir(folder)
            const iq = $iq({type: 'get'})
                .c('download-request', {xmlns: NS})
                .c('id', {}).t(url)

            console.log('WAITING FOR IQ RESPONSE', url)
            let data = await xmpp.sendIQ(iq)
            if (!data) {
                throw 'invalid data'
            }
            if (!data.download) {
                console.log('file data should be defined', data)
                return
            }
            data = data.download
            assert(data.url, 'data.url should be defined')
            let headers = {}
            if (data.headers && data.headers.header) {
                let arr = data.headers.header
                if (!Array.isArray(arr)) {
                    arr = [arr]
                }
                for (let header of arr) {
                    headers[header.name] = header.value
                }
            }
            console.log('WAIT FOR DOWNLOADING', url, data.url, fileName)
            try {
                await downloadHttpFile(data.url, fileName, headers)
            } catch (e) {
                console.log('ERROR: ', e, ' remove file')
                await fs.unlink(fileName)
                throw e
            }
            res.cached = false
            //console.log("DOWNLOADED ", fileName);
        }
        return res
    }

    async requestUpload ({file, size, width, height, purpose, access}) {
        console.log('requestUpload', Date.now(), {file, size, width, height, purpose, access})
        assert(file, 'file should be defined')
        assert(file.name, 'file.name should be defined')
        assert(size, 'size should be defined')
        assert(file.type, 'file.type should be defined')
        assert(width, 'width should be defined')
        assert(height, 'height should be defined')
        const iq = $iq({type: 'set'})
            .c('upload-request', {xmlns: NS})
            .c('filename', {}).t(file.name).up()
            .c('size', {}).t(size).up()
            .c('mime-type', {}).t(file.type).up()
            .c('width', {}).t(width).up()
            .c('height', {}).t(height).up()
        if (access) {
            iq.c('access', {}).t(access)
        }

        // pass file to the result
        const stanza = await xmpp.sendIQ(iq)
        const data = {...stanza.upload, file}
        await this.upload(data)
        console.log('DATA:', data)
        assert(data.reference_url, 'reference_url is not defined')
        return data.reference_url
    }

    upload ({method, headers, url, file}) {
        //console.log(`uploadFile(${method}, ${url}`, JSON.stringify(headers));
        assert(url, 'url should be defined')
        assert(file, 'file should be defined')
        assert(headers, 'headers should be defined')
        assert(method, 'method should be defined')
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest()
            request.open(method, url, true)
            let formData = new FormData()
            let resheaders = {}
            let headerArr = headers.header ? headers.header : []
            if (!Array.isArray(headerArr)) {
                headerArr = [headerArr]
            }
            for (let header of headerArr) {
                console.log('HEADER:', header.name, header.value)
                resheaders[header.name] = header.value
                request.setRequestHeader(header.name, header.value)
            }
            request.send(process.env.NODE_ENV === 'test' ? file.body : {uri: file.uri})
            request.onreadystatechange = function (oEvent) {
                //console.log("onreadystatechange", oEvent, request.readyState)
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        console.log('Successful upload', Date.now())
                        resolve()
                    } else {
                        console.log('Error upload', request.responseText)
                        reject(request.responseText)
                    }
                }
            }
            // if (isTesting) {
            //   formData.append("file", file.body);
            //   const URL = require("url");
            //   const urlData = URL.parse(url);
            //   console.log("SUBMIT FORM:", urlData.hostname, urlData.port || 80, urlData.path, JSON.stringify(resheaders), headerArr);
            //   request.send(file.body);
            //   request.onreadystatechange = function(oEvent) {
            //     if (request.readyState === 4) {
            //       if (request.status === 200) {
            //         console.log("Successful upload");
            //         resolve();
            //       } else {
            //         console.log("Error upload");
            //         reject(request.responseText);
            //       }
            //     }
            //   };
            // formData.submit({
            //     host: urlData.hostname,
            //     port: urlData.port || 80,
            //     path: urlData.path,
            //     method: method,
            //     headers: resheaders,
            //     contentType
            //   },
            //   (err, res)=> {
            //   console.log("RESPONSE:",res.statusCode);
            //     if (res.statusCode >= 400) {
            //       reject(res.statusMessage);
            //     } else if (err) {
            //       reject(err);
            //     } else {
            //       resolve();
            //     }
            //     res.resume();
            //   });
            // } else {
            //   formData.append("file", file);
            //   request.onreadystatechange = function(oEvent) {
            //     if (request.readyState === 4) {
            //       if (request.status === 200) {
            //         console.log("Successful upload");
            //         resolve();
            //       } else {
            //         console.log("Error upload");
            //         reject(request.responseText);
            //       }
            //     }
            //   };
            //   request.send(formData);
            // }
        })
    }
}

export default new FileStore()