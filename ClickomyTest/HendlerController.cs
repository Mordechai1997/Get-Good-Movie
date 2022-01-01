using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ClickomyTest
{
    class HendlerController
    {
        public static string FetchApiServer(string url) // settings.url, settings.method, setting.data

        {
            if (!string.IsNullOrEmpty(url))
            {
                HttpResponseMessage response = new HttpResponseMessage();
                using (var handler = new HttpClientHandler { UseDefaultCredentials = true })
                {
                    using (HttpClient client = new HttpClient(handler))
                    {
                        try
                        {
                            response = client.GetAsync(url).Result;
                            response.EnsureSuccessStatusCode();
                            string responseBody = response.Content.ReadAsStringAsync().Result;
                            return responseBody;
                        }
                        catch 
                        {
                            return null;
                        }
                    }
                }
            }
            return null;

        }
    }
}
