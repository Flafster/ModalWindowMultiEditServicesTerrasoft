 namespace Terrasoft.Configuration
{
	using Core.Factories;
    using System;
    using System.Collections.Generic;
	using System.Runtime.Serialization;
    using System.Linq;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using Terrasoft.Common;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using Terrasoft.File;
	using Terrasoft.Core.ServiceModelContract;
	using Web.Common;

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class ServiceItemEditHandler: BaseService
    { 
        private SystemUserConnection _systemUserConnection;
        private  SystemUserConnection SystemUserConnection => 
            _systemUserConnection ?? (_systemUserConnection = (SystemUserConnection)AppConnection.SystemUserConnection);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
            ResponseFormat = WebMessageFormat.Json)]
        public void UpdateServiceItemsWithParams(Guid[] items, ServiceItemParams fields) {
			foreach(Guid itemId in items){
				var item = new ServiceItem(SystemUserConnection);
				if(!item.FetchFromDB(itemId)) throw new Exception("ServiceItem not found");
				
				if(fields.Status != Guid.Empty) item.StatusId = fields.Status;
				if(fields.ReactionTimeUnit != Guid.Empty) item.ReactionTimeUnitId = fields.ReactionTimeUnit;
				if(fields.ReactionTimeValue != 0) item.ReactionTimeValue = fields.ReactionTimeValue;
				if(fields.SolutionTimeUnit != Guid.Empty) item.SolutionTimeUnitId = fields.SolutionTimeUnit;
				if(fields.SolutionTimeValue != 0) item.SolutionTimeValue = fields.SolutionTimeValue;
				if(fields.MatchingTime != 0) item.INKMatchingTime = fields.MatchingTime;
				if(fields.ClarificationTime != 0) item.INKClarificationTime = fields.ClarificationTime;
				if(fields.ClosingTime != 0) item.INKClosingTime = fields.ClosingTime;
				//if(fields.ServiceTotal_Sla != 0) item.G3CServiceTotal_Sla = fields.ServiceTotal_Sla;
				//if(fields.ServiceTotal_Exectime != 0) item.G3CServiceTotal_Exectime = fields.ServiceTotal_Exectime;
				item.INKDisplayOnPortal = fields.DisplayOnPortal;
				item.Save();
				
		}
	}
	
	[DataContract]
    public class ServiceItemParams
    {
      [DataMember(Name = "status")]
      public Guid Status;

      [DataMember(Name = "displayOnPortal")]
      public bool DisplayOnPortal;

      [DataMember(Name = "reactionTimeUnit")]
      public Guid ReactionTimeUnit;

      [DataMember(Name = "reactionTimeValue")]
      public int ReactionTimeValue;
      
      [DataMember(Name = "solutionTimeUnit")]
      public Guid SolutionTimeUnit;
	  
	  [DataMember(Name = "solutionTimeValue")]
      public int SolutionTimeValue;
	  
	  [DataMember(Name = "matchingTime")]
      public int MatchingTime;
	  
	  [DataMember(Name = "clarificationTime")]
      public int ClarificationTime;
	  
	  [DataMember(Name = "closingTime")]
      public int ClosingTime;
	  
	  /*[DataMember(Name = "serviceTotal_Sla")]
      public int ServiceTotal_Sla;
	  
	  [DataMember(Name = "serviceTotal_Exectime")]
      public int ServiceTotal_Exectime;*/
    }
	
    }
}