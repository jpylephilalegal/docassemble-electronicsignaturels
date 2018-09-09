# docassemble.electronicsignaturels

This is a [**docassemble**] add-on package that demonstrates a method of
integrating Legal Server with [**docassemble**] for the purpose of
gathering electronic signatures from clients.

## An example of getting signatures for a Citizenship Attestation

Somewhere on the Main Profile of a case in Legal Server, an advocate
will see a link that says "Click here to generate a link that you can
share with the client."  When the advocate clicks the link, the link
will replaced with a "Please wait..." message, and after a few seconds
this message will be replaced with the message: "Here is the link to
share with the client: Citizenship Attestation" where "Citizenship
Attestation" is a hyperlink.  The advocate then copies the
"Citizenship Attestation" hyperlink and pastes it into an e-mail to
the client.  Or, if using text messaging, the advocate will
right-click on the link, select "Copy link address" (or "Copy Link
Location"; it depends on the browser), and then paste the URL into a
text message to the client.

The client will receive the message and click on the link.  The link
will take the client to a mobile-friendly guided interview that will
ask a few questions, such as "are you a United States citizen?".  The
guided interview will already know certain information about the
client, such as name and e-mail address, so the client will not have
to type very much.

After agreeing to sign the Citizenship Attestation, the client will
sign their name on the touch screen.  Then at the end of the guided
interview, a copy of the citizenship attestation with the signature
embedded will be e-mailed to the Legal Server case.  A copy will also
be e-mailed to the advocate who clicked "Click here to generate a link
that you can share with the client."  The client will be given the
opportunity to receive a copy of the document via e-mail.

This is just one example of a system you could set up.  You could also
use this system to obtain signatures from a client on a retainer
agreement, or medical release forms.

## Overview of setup process

You will need a [**docassemble**] server that is accessible from the
internet.  Since [**docassemble**] is free software, you can install
it on a physical machine or a virtual machine on your own premises,
and then configure your firewall so that the outside world can access
the machine on ports 80 and 443.  There will be no out-of-pocket
monthly cost for this approach.

Another approach, which most people use, is to run a [**docassemble**]
server "in the cloud" using the [Docassemble Toolkit] service.  Or, if
you are comfortable with setting up virtual machines in the cloud, you
can host it yourself in the cloud using a service like [Amazon Web
Services], [Digital Ocean], or [Microsoft Azure].  The [Docassemble
Toolkit] service costs about the same per month as using [Amazon Web
Services] on your own.

Regardless of where you run the [**docassemble**] server, you will
need to own a domain (e.g., `philalegal.org`) and you will need the
ability to edit your [DNS].  One of the things you will do with your [DNS]
is add a new hostname (e.g., `esign.philalegal.org`), and point it
toward your [**docassemble**] server using an A record or a CNAME
record.  You should do this before running the server for the first
time.

Take some time to think about a good hostname, because clients will
see the name in the link that the advocate gives them.  A name like
`testing123.philalegal.org` or `fredsmachine.philalegal.org` does not
inspire trust.  Think of something along the lines of
`documents.philalegal.org` or `law.philalegal.org`.  Consider that in
the future, you might want to use [**docassemble**] for other guided
interviews, so you may want to pick a name that sounds generic.

Your [**docassemble**] server will need to be able to send e-mail.
Since spam is a big problem on the internet, there are a lot of
barriers to sending e-mail.  The easiest way around these barriers is
to sign up for a free account on [Mailgun].  This will require some
changes to your DNS, which will not interfere with the way you send
e-mail currently from your domain.  There are other ways to [configure
e-mail] if you don't want to use [Mailgun].

Once you get your [**docassemble**] server running, you will need to
customize the guided interview that clients will use.  This will
require getting to know [**docassemble**].  Note that [**docassemble**] is
a general-purpose guided expert system designed for coding the law and
making legal expertise available on the web; it is not a tool designed
specifically for signing documents.  Since [**docassemble**] is a
general-purpose tool, you have the benefit of a lot of flexibility in
specifying what it does.  However, since it is not a specialized tool,
you have the burden of figuring out exactly what you want the system
to do.  You will effectively need to write a "computer program."
Luckily, this package provides a sample for you to follow, so you can
write this computer program just by editing an existing program.

The first step of the interview customization process is to use the
[**docassemble**] [Playground] to develop and test your guided
interview.  This involves editing a [**docassemble**] [YAML] file in the
[Playground] (starting with the sample template) and creating one or
more Microsoft Word .docx files that you upload to to the "templates
folder" of the [Playground].  You need to make sure that each possible
screen that a client could see is customized to your organization and
contain appropriate plain language.  You need to test every possible
branch of the "logic tree" to make sure that there are no errors.

Once your interview is in final (or near-final) form, the second step
is to bundle your guided interview into a "package."  Creating a
"package" takes the current version of your guided interview from the
[Playground] and makes a "snapshot" of it.  The name of this package
will be something like `docassemble.philalegalsign`.  You can call the
package whatever you want, but if you might want to share your package
on the internet so that other people can benefit from your work, you
should pick a package name that identifies your organization.

You will then install your package on your [**docassemble**] server.
This will be what your advocates and clients use.  Your [Playground]
version will continue to exist, and you can feel free to make changes
to it and experiment with it, without needing to worry that you will
break something and your users will see an error.

Then you will need to integrate your guided interview with Legal
Server.  This will require an admin account on your Legal Server.  You
will need to customize the Main Profile screen of a case by inserting
two "instructions" with "Format as HTML" checked.  The text of these
instructions is available below.  You will need to copy and paste this
HTML and then customize it a little bit.  You do not need to "know
HTML" in order to do this; you just need to be able to edit it.

Do not ask the Legal Server folks for help with this part; it would be
outside the scope of the support they can reasonably be expected to
provide.  Asking the Legal Server folks for help with a
[**docassemble**] integration would be like installing a satellite dish
on the roof of your Honda Civic and then expecting your Honda
dealership to help figure out if the electromagnetic waves you are
detecting with your satellite dish represent extraterrestrial life.

## Steps of the setup process

### Set up Mailgun

Your [**docassemble**] server will use [Mailgun]'s HTTP API interface to
send e-mails.  Some of these e-mails may be sent to clients.  Thus, it
is important that the e-mails appear to come from your domain.

You need to register for Mailgun, set it up to work with your domain,
and obtain an API key.

As was mentioned before, there are other ways to [configure e-mail] if
you don't want to use [Mailgun].

### Start the **docassemble** server

Setting up your [**docassemble**] server is a big process; see the
[**docassemble**] web site for the instructions.  You may choose to
use [Docassemble Toolkit] to deploy your server, in which case the
task is much simpler.  There are a number of different ways to deploy
[**docassemble**] depending on your needs and your in-house technical
know-how.

There are a few generally-applicable things you should know before you
begin this process.

First, you will definitely want to use encrypted HTTPS rather than
HTTP.  Your app will use client information, so encrypted
communications are a must.  The easiest way to set this up is by
launching Docker with `DAHOSTNAME` set to your hostname, `USEHTTPS`
set to true, `USELETSENCRYPT` set to true, and `LETSENCRYPTEMAIL` set
to your e-mail address.  This will enable the automatic SSL
certificate system, which is based on Let's Encrypt.  You will likely
never receive e-mails from Let's Encrypt, because [**docassemble**] will
renew its SSL certificates automatically, but Let's Encrypt does not
work without an e-mail address.

Before you do `docker run` to start your [**docassemble**] server, you
will need to configure DNS on your domain so that the hostname you use
as the `DAHOSTNAME` points to the server on which you are running
Docker.  For example, if you are running Docker on an [Amazon Web
Services] EC2 instance located at
`ec2-53-235-152-132.us-west-1.compute.amazonaws.com`, you will need to
add a CNAME record to your DNS that associates your hostname (e.g.,
`esign.philalegal.org`) with
`ec2-53-235-152-132.us-west-1.compute.amazonaws.com`.  Or, if you know
your server's IP address is `123.124.125.126`, then you will need to
add an A record to your DNS that associates your hostname with
`123.124.125.126`.  This is necessary for the Let's Encrypt process to
work.

Second, you should set the `CROSSSITEDOMAIN` to your Legal Server URL,
e.g., `https://pla.legalserver.org`.  This will ensure that your
advocates' web browsers will be able to communicate with your
[**docassemble**] server.

These settings can be changed after your server is already up and
running, but it is much easier if these settings are made at the very
beginning.

### Update **docassemble** configuration

Log in to your docassemble server as an administrator and go to
[Configuration] from the menu.

Add the following settings.

```
exitpage: http://philalegal.org
root redirect url: https://philalegal.org
cross site domain: https://pla.legalserver.org
api privileges:
  - admin
  - user
interview delete days: 180
mail:
  mailgun domain: mg.philalegal.org
  mailgun api key: xyz_super_secret_api_key_xyz
  default sender: '"Philadelphia Legal Assistance" <no-reply@philalegal.org>'
```

Note that some of these settings may already be set in your
[Configuration].  If so, make sure to overwrite them.  Duplicative
entries are not allowed.  Note that the order in which directives
appear in the [Configuration] is arbitrary, so you can add the new
directives wherever you want.

The `exitpage` is the default URL that users will be directed to when they
click an "Exit" button at the end of their interview.

The `root direct url` is the URL that users will be directed to if
they navigate directly to the hostname of your server.  For example,
if your server's hostname is `sign.philalegal.org`, your users will
receive URLs beginning with `https://sign.philalegal.org`.  They may
assume that your organization has a web site at
`https://sign.philalegal.org`.  But `sign.philalegal.org` is not your
organization's web site.  If your `root direct url` is
`https://philalegal.org`, then someone who types
`https://sign.philalegal.org` (with nothing following it) into their
browser location bar will be redirected to `https://philalegal.org`.

The only problem with setting `root direct url` is that you may forget
how to log in to your **docassemble** server.  If your server is
`https://sign.philalegal.org`, you should bookmark the link
`https://sign.philalegal.org/playground`.  This will take you to your
[Playground] if you are logged in, and will take you to the login
screen if you are not logged in.

The `cross site domain` needs to be set to the URL of your Legal
Server instance.  This will allow Legal Server to talk to
[**docassemble**].  If you set `CROSSSITEDOMAIN` at the time you
started Docker, this should already be set.  If you did not set
`CROSSSITEDOMAIN` at the time you started your server, and you add it
to your [Configuration] later, you will need to restart your server
after saving your [Configuration].  In [Docassemble Toolkit], you can
do this by clicking the "Restart" button in the dashboard.  On the
Docker command line, you can do `docker -t60 stop <containerid>`
followed by by `docker start <containerid>`, where `<containerid>` is
the ID of your Docker container.

The `api privileges` part of the [Configuration] is necessary so that
Legal Server can use the [**docassemble**] API to start a
[**docassemble**] session for a client.  As explained below, you will
need to create a user in [**docassemble**] with the privileges of a
`user` and set up an API key for the user.

The default value for `interview delete days` is 90, which means that
90 days after your advocates send a link to a client, if the client
has not clicked the link, the link will be deactivated.  You might
want to change this to a different number of days.

The `mailgun domain` and `mailgun api key` directives under the `mail`
configuration are where you put in the information you received when
you signed up for [Mailgun].  The `default sender` is the e-mail
address that will be used as the sender when your guided interview
sends an e-mail.  The name of the e-mailer should be something that
the user will trust, but the e-mail address can be non-existent, such
as `no_reply@philalegal.org`.  You may want to use a real e-mail
address, so that if a client replies to the e-mail, someone at your
organization sees it.  If you want the e-mails from the guided
interview to appear to come from the advocate who initiated the
process, this can be arranged; you would need to edit the
`send_email()` lines in the interview file.

### Install the docassemble.electronicsignaturels add-on package

Once you get the [**docassemble**] server up and running, log in as an
administrator and head to [Package Management].  Copy and paste the
URL
`https://github.com/jpylephilalegal/docassemble-electronicsignaturels`
into the "GitHub URL" field and press "Update."  This will install the
`docassemble.electronicsignaturels` package on your server.  This
provides functionality for integrating Legal Server with
[**docassemble**].

Right now, you are reading the `README` file for the
`docassemble.electronicsignaturels` package.  This package is
available on GitHub at the URL
https://github.com/jpylephilalegal/docassemble-electronicsignaturels.

### Customize the interview and edit the templates

Next, head to the [Playground] and click "Add" to create a new
interview file.  You can call it `citizenship.yml` or something else.
Don't call it anything weird, because clients will be able to see the
name in the location bar of the browser when they are filling out the
interview.

Then, in another browser tab, go to the file in this GitHub repository
called [sample.yml].  This is a sample guided interview that collects
a citizenship attestation from a client who is a citizen, and asks
non-citizen clients to upload a picture of their immigration
documentation (i.e. through the smartphone camera).  For users who are
not comfortable with electronically signing, or who are not able to
upload their immigration documentation, it provides the address where
the user can mail the documents.

You can use the contents of [sample.yml] as a starting point for
developing the guided interview you want your users to use.  To do
this, click the "Raw" button.  This will take you to a page that has
nothing except the content of the file.  Press Ctrl-a to select all
and Ctrl-c to copy.  Then go back to the [Playground], click inside
the text editor window, and press Ctrl-v to paste.  Then press the
"Save" button.

In the sidebar on the right you will see a message about an error.
Don't worry about the error; there is a good reason for it, and you'll
remedy the cause of it soon.

One of the "blocks" in the YAML file looks like this:

    ---
    attachment:
      filename: |
        ${ "ca_" + space_to_underscore(ls.name) }
      docx template file: citizenship_attestation.docx
      variable name: citizenship_attestation
    ---

`ls.name` refers to the name of the client, as provided by Legal
Server.  Assuming that `ls.name` is `"John Smith"`, this block means
"use the template file `citizenship_attestation.docx` to assemble a
document in .docx and .pdf formats with the filenames
`ca_John_Smith.docx` and `ca_John_Smith.pdf`."

The line `docx template file: citizenship_attestation.docx` refers to
a file in the "templates" folder called
[citizenship_attestation.docx].  This is a Word document in which
fields are indicated with double curly brackets.  For example:

> Hello, my name is {{ ls.name }}.

Since the guided interview in your [Playground] depends on a file
called [citizenship_attestation.docx] being in the "templates" folder,
you will need to upload a file called `citizenship_attestation.docx`
into the templates folder of the [Playground].  (Or, you could upload
a file with a different name and then change the `docx template file`
directive.)

To upload the file, go to Folders -> Templates in the [Playground].
This is where the template files reside for all interviews that you
are developing inside the [Playground].  Right-click
[citizenship_attestation.docx] and save this file to your computer.
On the Templates screen, upload the "citizenship_attestation.docx"
file from your computer.  Once you upload it, you should see it listed
under "Existing template files" on the Templates screen.

Now you can test out the sample interview.  From the Templates folder,
click the "< Back" button to return to the main page of the
[Playground].  Click the "Save and Run" button.  This will run the
guided interview in another browser tab.  This interview is what the
client will see when they click on the link their advocates send them.

This guided interview acts as though it has already received
information from Legal Server, but in actuality the Legal Server
integration process is being bypassed and "dummy" information is being
substituted.  The "dummy mode" feature is controlled by the line:

    use_fake_data = True

You should keep it this way for now, but eventually, you will set
`use_fake_data = False` once you get Legal Server integration set up.

There is also a line that sets `debug_mode = False`.  You can try
setting this to `True` if you want; this means that the first screen
of the guided interview will be a summary of the data obtained from
Legal Server.  This can be useful so that you can see what information
has already been obtained from Legal Server, so that you don't have to
ask the same information from the user during the interview.

After you see how the interview works, you can get started customizing
it.  Part of this is easy: if the interview mentions "Philadelphia
Legal Assistance" or "philalegal.org," replace that with information
about your organization.  Other parts, like adding new questions or
changing the process, will require some familiarity with
[**docassemble**] [authoring].  Note that the order in which the
questions appear in the [YAML] does not determine the order in which
questions are asked; rather, there is a `code` block that determines
the logical order of the interview questions.

The format of this interview file is [YAML] -- "Yet Another Markup
Language."  The idea behind [YAML] is that it is both machine readable
but also human-readable and clean-looking.  Instead of using curly
brackets, it uses indentation.  Indentation is very important for the
structure of the information, so while you are changing the text of
question, make sure to preserve the way it is indented.

In addition to editing the [YAML] of the interview, you will probably
need to customize the template.  To do this, edit the
`citizenship_attestation.docx` file that you saved to your computer,
and then upload the new version to the "Templates" folder of the
[Playground].  (Note: when you become a more advanced [**docassemble**]
user, you can set up the [Google Drive integration feature], and then
you won't need to upload a file every time you make a change.)

You can start preparing the template files in Microsoft Word, but if
you use fancy formatting, it is recommended that you use [LibreOffice]
to make the final versions.  [**docassemble**] uses [LibreOffice] to
make the final PDF versions of the documents, and sometimes the
formatting that you use in Microsoft Word does not carry over into
[LibreOffice].  For example, [LibreOffice] has Times New Roman but not
Calibri.  [LibreOffice] is a free download and is available on all
platforms.

### Bundle your interview and templates into a package and install it

As the name suggests, the [Playground] is a place to play around with
things, as opposed to a place where things are stable and serious.
Guided interviews that live in the [Playground] are fully functional,
but they should not be used "in production."

To provide your users with a "production" version of the interview,
you need to bundle your interview into a package and then install the
package on your server.

Before you create this package, though, you should edit your guided
interview and set:

    use_fake_data = False

This will get the guided interview ready for integration with Legal
Server.

You should also set:

    debug_mode = True

This will allow you to start testing the integration with Legal
Server.  The effect of `debug mode` is to make the first screen of the
interview a screen that shows a summary of the information obtained
from Legal Server.

To create the package, go to the [Playground] and then to Folders ->
Packages.  Then click "Add."

Give the package a name.  Do not use any punctuation or spaces in the
name.  The abbreviated name of your organization is a good place to
start.  For example, good package names for Philadelphia Legal
Assistance are `philalegal`, `pla`, and `pladocs`.

Under "Dependencies," select the package
`docassemble.electronicsignaturels`.

Under "Interview files," select the [YAML] file containing your guided
interview.  Under "Template files," select the template file(s) that
your interview uses.  Then scroll down to the bottom and press "Save."

Now that you have specified the ingredients of your package, scroll
down to the bottom of the page again and this time, click the
"Install" button.

Pressing "install" has the effect of taking a snapshot of the
interview file and the template file(s) and installing them on your
server.  If you change the interview file or the template in the
[Playground], the installed versions of those files will not be
affected until you come back to the Packages folder and press the
"Install" button again.

### Update **docassemble** configuration again

Now that you have installed your package, go to the [Configuration]
and add the following directive:

    dispatch:
      sign: docassemble.philalegal:citizenship-attestation.yml

Replace `philalegal` with the name of your package (all
[**docassemble**] add-on packages begin with `docassemble.`).  Replace
`citizenship-attestation.yml` with the name of your interview [YAML]
file.

The `dispatch` directive controls the text of the URL that your
advocates will share with clients.  It is important that this URL
"looks good," to the extent that any URL can "look good."  If your
clients see a link that looks untrustworthy, they might not want to
click on it.

If your hostname is `https://sign.philalegal.org`, and your `dispatch`
directive is set to the above, then your URL will look like:

    https://sign.philalegal.org/start/sign?session=pLAvfSOBzgWqixsCuwVlnnShkArPHBVm

It is actually not necessary to use `dispatch`.  If you don't use
`dispatch`, your links will look like this:

    https://sign.philalegal.org/interview?i=docassemble.philalegal:data/questions/citizenship-attestation.yml&session=pLAvfSOBzgWqixsCuwVlnnShkArPHBVm

The former is a little bit less intimidating.  For security purposes,
it is important that the `session` code be as long as it is.  If it
was short, hackers could access client information by guessing random
session codes.

The session code is necessary to ensure that the signed document can
be added to the Legal Server file.  It also allows you to make
information from the Legal Server screen available inside the guided
interview.

Theoretically, your users could start the guided interview without a
session code, using a link like
`https://sign.philalegal.org/start/citizenship`, but then the client
would need to manually type in their Legal Server case ID and any
other information needed by the interview.

### API connection to docassemble

Next, you need to set up [**docassemble**] so that Legal Server can
communicate with it.  (Technically, it is your advocates' web browsers,
when the advocates are logged on to Legal Server, that will connect to
[**docassemble**].  The "server" behind Legal Server does not talk to
[**docassemble**].)

In [**docassemble**], log in as the administrator and go to User List
-> Menu -> Add a user.  Give the user the name "API user" and give the
user an e-mail address like apiuser@philalegal.org.  It is ok if it is
a fake e-mail address.  The e-mail address does not need to exist, but
it needs to be different than the e-mail address on your administrator
account.  Set a password for the user and 

Log out of docassemble and log in as the "API user."

Go to Profile -> Other settings -> API keys.  Click New.  Set the
following values.

* Name: esign
* Security Method: Referring URL
* Allowed sites: *pla.legalserver.org

Press Save.  You will be provided with an API key.  Copy and paste it;
you will need the value in the next section.

### Legal Server setup

Log into your Legal Server instance as an administrator.  Go to Admin
-> Processes, Forms, and Profiles.

Place an "instruction" on a profile page or tab block, with "Format as HTML" checked.

Before clicking "Continue" to save, edit the text of this code and
substitute your server's hostname for `esign.docassemble.org`.

In place of
`docassemble.electronicsignaturels:data/questions/sample.yml`,
substitute the name of your package and [YAML] file.  If the name of
your package was `lsidaho`, and your [YAML] file is called `sign.yml`,
this should be `docassemble.lsidaho:data/questions/sign.yml`.

You should also change references to "citizenship attestation" to
something else if the document being signed is different.

```
<h2>Citizenship attestation via e-signature</h2><br>
<div id="caInitialBox">
  <a data-prefix="ca" data-server="https://esign.docassemble.org" data-interview="docassemble.electronicsignaturels:data/questions/sample.yml" data-key="8MZGDPCWWH7Z7QNDT9XETXMGWQUVUDDP" href="#" class="esignInitialLink">
    Click here to generate a link that you can share with the client
  </a>
</div>
<div id="caSuccessBox" style="display: none;">
  Here is the link to share with the client: <br>
  <a id="caClientLink" href="#">Citizenship Attestation</a>
</div>
<div id="caPendingBox" style="display: none;">
  Please wait...
</div>
<div id="caErrorBox" style="display: none;">
  There was an error obtaining the link.  Please contact the system administrator.
</div>
```

Place the following "instruction" at the bottom of the page, again
with "Format as HTML" checked.  Do not place this more than once on
the screen.  This instruction will be invisible.

Before clicking "Continue" to save, edit the text of this code and
substitute your server's hostname for `esign.docassemble.org`.

```
<script type="text/javascript" src="https://esign.docassemble.org/packagestatic/docassemble.electronicsignaturels/esign.js"></script>
<div id="esignCode"></div>
<script>
  document.getElementById("esignCode").parentNode.style.display = "none";
</script>
```

### Test the integration

The link in Legal Server should launch the guided interview.  Test it
thoroughly.

If you run into a problem and you aren't sure how to fix it, ask
question on the [**docassemble**] Slack group.

After you make any changes to the code in the [Playground], you will
need to go to Folders -> Packages and click "Install."  Legal Server
links to the installed version of your guided interview, not the
[Playground] version.

### Enable "production mode"

Once your interview is fully functional, you will want to turn off the
debugging features so your users don't see them.

Edit your [YAML] and set

    debug_mode = False

Then go to Folders -> Packages and click "Install."

After you have installed your interview on your server, go to
[Configuration] from the menu and change the `debug` setting to:

    debug: False

So far, your server has been in `debug: True` mode, which means that
users see a "Source" link in the navigation bar of each interview, and
the system spends a lot of time making sure that there are detailed
error messages in case something goes wrong.  When you're ready for
your interview to be used by end users, you should turn this mode
off.  You can still use the [Playground] in `debug: False` mode.

You will probably also want to set:

    show login: False

in the [Configuration].  This will take away the "Sign in or sign up
to save answers" link in the upper-right-hand corner and replace it
with an "Exit" link.  Your users' answers will be saved as long as
they retain the link with the `session` code in it.

## For assistance

If you have any questions about how to use [**docassemble**], a good
place to ask them is the [**docassemble** Slack group].

You can also contact the developer, Jonathan Pyle, at
[jpyle@philalegal.org](mailto:jpyle@philalegal.org).

[Docassemble Toolkit]: https://community.lawyer/docassemble
[Amazon Web Services]: https://aws.amazon.com/ec2/
[Digital Ocean]: https://www.digitalocean.com/
[Microsoft Azure]: https://azure.microsoft.com
[Mailgun]: https://www.mailgun.com/
[configure e-mail]: https://docassemble.org/docs/config.html#mail
[Playground]: https://docassemble.org/docs/playground.html
[LibreOffice]: https://www.libreoffice.org/
[**docassemble**]: https://docassemble.org
[DNS]: https://en.wikipedia.org/wiki/Domain_Name_System
[Configuration]: https://docassemble.org/docs/config.html
[sample.yml]: https://github.com/jpylephilalegal/docassemble-electronicsignaturels/blob/master/docassemble/electronicsignaturels/data/questions/sample.yml
[YAML]: https://en.wikipedia.org/wiki/YAML
[citizenship_attestation.docx]: https://github.com/jpylephilalegal/docassemble-electronicsignaturels/raw/master/docassemble/electronicsignaturels/data/templates/citizenship_attestation.docx
[authoring]: https://docassemble.org/docs/authoring.html
[Google Drive integration feature]: https://docassemble.org/docs/playground.html#google%20drive
[Package Management]: https://docassemble.org/docs/packages.html
[**docassemble** Slack group]: https://join.slack.com/t/docassemble/shared_invite/enQtMjQ0Njc1NDk0NjU2LTAzYzY5NWExMzUxNTNhNjUyZjRkMDg0NGE2Yjc2YjI0OGNlMTcwNjhjYzRhMjljZWU0MTI2N2U0MTFlM2ZjNzg
