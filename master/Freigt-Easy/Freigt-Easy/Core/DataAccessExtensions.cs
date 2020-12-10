using Freigt_Easy.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Freigt_Easy.Core
{
    internal static class DataAccessExtensions
    {
        internal static IQueryable<T> IncludeMultiple<T>(this IQueryable<T> query,
            params string[] includes) where T : class
        {
            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }
            return query;
        }


        public static List<User> WithOutPassword(this List<User> userData)
        {

            if (userData != null)
            {
                userData.ForEach((s) => s.Password=null);
            }
            return userData;
        }

        public static User WithOutPassword(this User userData)
        {

            if (userData != null)
            {
                userData.Password = null;
            }
            return userData;
        }


        public static string HmacSha256Digest(this string message, string secret)
        {
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] keyBytes = encoding.GetBytes(secret);
            byte[] messageBytes = encoding.GetBytes(message);
            System.Security.Cryptography.HMACSHA256 cryptographer = new System.Security.Cryptography.HMACSHA256(keyBytes);

            byte[] bytes = cryptographer.ComputeHash(messageBytes);

            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }
    }

}
