
const getApiData = ( url, cb ) =>{
    let http = require('http')
    const request = http.request(url, (response)=>{
    let result = ''
    response.on('data', (chunk)=>{
        console.log(chunk.toString())
        result +=chunk.toString()
    })
    response.on('end', ()=>{
        const all = JSON.parse(result)
        console.log(all)
        cb(all, false)
    })
    })
    request.on('error',(err)=>  {console.log(err); cb(false, 'error')})
    request.end()
}

const renderApiData = (req,response) =>{
    url= `http://medical.mind-techs.com/api/blog/${req.params.langID}/0/11`
    getApiData(url, (res, err)=>{
        if(err) response.send(err)
        response.render('allPosts', {data:res.data, title:'all article'})
    })
}
const getSingle = (req,response)=>{
    url= `http://medical.mind-techs.com/api/SingleBlog/${req.params.articleID}/${req.params.langID}`
    getApiData(url, (res, err)=>{
        if(err) response.send(err)
        response.render('single', {data:res.data, title:'single article'})
    })


}
module.exports = {
    renderApiData,
    getSingle
}