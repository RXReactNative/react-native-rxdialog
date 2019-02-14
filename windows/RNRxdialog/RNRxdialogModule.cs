using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Rxdialog.RNRxdialog
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNRxdialogModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNRxdialogModule"/>.
        /// </summary>
        internal RNRxdialogModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNRxdialog";
            }
        }
    }
}
