function esignFixValue(valueText){
  var theValue;
  valueText = valueText.replace(/<br ?\/?>/g, "\n").replace(/\<[^\>]+\>/g, '').replace(/(^ +| +$)/g, '').replace(/  +/g, ' ').replace(/ ?\[Edit\]/g, '').replace(/ *\n+ */g, ", ");
  if (valueText == 'Yes')
    theValue = true;
  else if (valueText == 'No')
    theValue = false;
  else if (valueText == 'N/A' || valueText == '')
    theValue = null;
  else
    theValue = valueText;
  return theValue;
}
function esignGetURL(event){
  var args = { id: jQuery("header.Main ul li h2").html().replace(/^.*\(/, '').replace(/\)$/, ''),
	       name: jQuery("header.Main hgroup h1").html(),
	       initiating_user: jQuery("li.user a strong").html(),
	       initiating_user_email_address: jQuery('input[name="bug_sender_email"]').val(),
	       sidebar_domestic_violence: null,
	       sidebar_unsafe_address: null
	     };
  jQuery("#sidebar table tr").each(function(){
    if (jQuery(this).find("td").length > 0){
      var labelText = 'sidebar_' + jQuery(this).find("th").text().toLowerCase().replace(/[^a-z]+/g, '_').replace(/(^_|_$)/g, '');
      if (labelText == 'sidebar_' && jQuery(this).find("th").next().length){
	var theMessage = jQuery(this).find("th").next().html();
	if (theMessage == 'Address Not Safe'){
	  args['sidebar_unsafe_address'] = true;
	}
      }
      if (labelText != 'sidebar_'){
	var valueText = jQuery(this).find("th").next().html();
	if (labelText == 'sidebar_disposition_case_status_date_open'){
	  var theVals = esignFixValue(valueText).split(", ");
	  args['sidebar_disposition'] = theVals[0];
	  args['sidebar_case_status'] = theVals[1];
	  args['sidebar_date_open'] = theVals[2];
	}
	else{
	  args[labelText] = esignFixValue(valueText);
	}
      }
    }
    else{
      var valueText = jQuery(this).find("th").text();
      if (valueText.indexOf('@') > -1){
	args['case_email'] = valueText;
      }
    }
  });
  jQuery("td.form_label label").each(function(){ 
    if (jQuery(this).attr('for')){
      var elem = document.getElementById(jQuery(this).attr('for'));
      if (elem.tagName != 'SELECT' && elem.tagName != 'INPUT'){
	var labelText = jQuery(this).text().toLowerCase().replace(/[^a-z]+/g, '_').replace(/(^_|_$)/g, '');
	var valueText = jQuery(elem).html();//.replace(/ *\[Edit\]/, '');
	args[labelText] = esignFixValue(valueText);
      }
    }
  });
  if (args['address']){
    if (args['address'].startsWith("(Safe)")){
      args['safe_address'] = true;
    }
    else if (args['address'].startsWith("(Not Safe)")){
      args['safe_address'] = false;
    }
    args['address'] = args['address'].replace(/^\((Safe|Not Safe)\) */, '');
  }
  var target = event.currentTarget;
  var esignServer = jQuery(target).data('server');
  var esignPrefix = jQuery(target).data('prefix');
  var esignAPIKey = jQuery(target).data('key');
  var params = [
		 { name: "key", value: esignAPIKey },
		 { name: "i", value: jQuery(target).data('interview') }
	       ];
  jQuery.ajax({
    type: "GET",
    url: esignServer + '/api/session/new' + "?" + jQuery.param(params),
    crossDomain: true,
    success: function(data){
      jQuery.ajax({
	type: "POST",
	url: esignServer + '/api/session/action',
	data: { key: esignAPIKey, i: data.i, session: data.session, action: 'initialize', arguments: JSON.stringify(args) },
	crossDomain: true,
	success: function(subdata){
	  jQuery("#" + esignPrefix + "PendingBox").hide();
	  jQuery("#" + esignPrefix + "SuccessBox").show();
	  jQuery("#" + esignPrefix + "ClientLink").attr('href', subdata.url);
	},
	error: function(xhr, status, error){
	  jQuery("#" + esignPrefix + "PendingBox").hide();
	  jQuery("#" + esignPrefix + "ErrorBox").show();
	  console.log("Error fetching :" + error);
	},
	dataType: 'json'
      });
    },
    error: function(xhr, status, error){
      jQuery("#" + esignPrefix + "PendingBox").hide();
      jQuery("#" + esignPrefix + "ErrorBox").show();
      console.log("Error fetching :" + error);
    },
    dataType: 'json'
  });
  jQuery("#" + esignPrefix + "InitialBox").hide();
  jQuery("#" + esignPrefix + "PendingBox").show();
  event.preventDefault();
  return false;
}
var esignLinks = document.getElementsByClassName("esignInitialLink");
for (var i = 0; i < esignLinks.length; i++){
  esignLinks[i].addEventListener("click", esignGetURL);
}
