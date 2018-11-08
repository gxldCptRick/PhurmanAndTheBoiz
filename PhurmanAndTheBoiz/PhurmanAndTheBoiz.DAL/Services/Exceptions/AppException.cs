using System;
using System.Globalization;

namespace PhurmanAndTheBoiz.DAL.Services.Exceptions
{
    public class AppException : ArgumentException
    {
        public AppException() : base() { }

        public AppException(string message) : base(message) { }

        public AppException(string message, params object[] args)
            : base(string.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }
}
