<%@ WebHandler Language="C#" Class="GooglePlus" %>

using System;
using System.Web;
using Ektron.Com.Helpers;
using System.Net;
using System.Text;
using System.IO;

public class GooglePlus : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "application/json";
        string API_KEY = "none needed"; // it actually failed when I included the key, don't know why
        string API_URL = "https://clients6.google.com/rpc";

        string url;
		// second condition keeps sharing limited to domains on your site
        if (!string.IsNullOrEmpty(context.Request.QueryString["url"]) && context.Request.QueryString["url"].StartsWith("http://www.ektron.com/"))
        {
            url = context.Request.QueryString["url"];
            string PostData = "[{\"method\": \"pos.plusones.get\",\"id\": \"p\",\"params\": {\"nolog\": true,\"id\": \"" + url + "\",\"source\": \"widget\",\"userId\": \"@viewer\",\"groupId\": \"@self\"},\"jsonrpc\": \"2.0\",\"key\": \"p\",\"apiVersion\": \"v1\"}]";
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(API_URL);
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] data = encoding.GetBytes(PostData);

            req.Method = "POST";
            req.ContentType = "application/json";
            req.ContentLength = data.Length;
            req.Referer = "http://www.example.com/";

            using (Stream reqStream = req.GetRequestStream())
            {
                reqStream.Write(data, 0, data.Length);
            }

            HttpWebResponse response = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(response.GetResponseStream());
            string json = reader.ReadToEnd();
            context.Response.Write(json);
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}