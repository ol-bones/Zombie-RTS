// Dependencies

class AssetRequest
{
    constructor(uri)
    {
	this.m_URI = uri;
	this.m_FileType = uri.split('.').pop();
	this.m_FileName = this.m_URI.replace(/^.*[\\\/]/, '').split('.')[0];

	this.m_Loader = null;

	this.m_Progress = 0;

	this.m_LoadState = LOADSTATE.INACTIVE;

	this.m_Asset = null;
    }

    Initialise()
    {
	this.m_LoadState = LOADSTATE.ERROR;
    }

    onInitialised()
    {
	this.m_LoadState = LOADSTATE.INITIALISED;
    }

    onQueued()
    {
	this.m_LoadState = LOADSTATE.QUEUED;
    }

    Download()
    {
	this.m_LoadState = LOADSTATE.ERROR;
    }

    onDownloading()
    {
	this.m_LoadState = LOADSTATE.DOWNLOADING;
    }

    onProgress()
    {
	this.m_Progress += 1;
	console.log(this.m_Progress);
    }

    onFinished()
    {
	this.m_LoadState = LOADSTATE.FINISHED;
    }

    onCached()
    {
	this.m_LoadState = LOADSTATE.CACHED;
    }

    onError()
    {
	this.m_LoadState = LOADSTATE.ERROR;
	console.error("ASSET LOAD ERROR: [" + this.m_FileName + "]");
    }

    ShouldDispose()
    {
	return this.m_LoadState === LOADSTATE.ERROR || this.m_LoadState === LOADSTATE.DISPOSE || this.m_LoadState === LOADSTATE.CACHED;
    }

    Dispose()
    {
	this.m_LoadState = LOADSTATE.DISPOSE;

	delete this.m_Loader;
	delete this.m_URI;
	delete this.m_Progress;
	delete this.m_FileType;
	delete this.m_FileName;
	delete this.m_Asset;
    }
}