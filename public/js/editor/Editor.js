// Dependencies
// @Game@
// @World@
// @Entity@
// @Component@

// @EntityTreeView@

class Editor
{
    constructor()
    {
	this.m_SelectedTexture = "";
	this.m_TextureBrowserIndex = 0;

	this.m_ref_SelectedEntity = null;

	this.m_EntityTreeViewView = new EntityTreeView();
	this.m_EntityManipulator = new EntityPropertyManipulatorView();
    }

    render()
    {
	this.m_EntityTreeViewView.render();
    }

    SelectEntity(id)
    {
	let entity = entities().find(e => e.m_ID === id);
	if(entity)
	{
	    this.m_ref_SelectedEntity = entity;
	    this.m_EntityManipulator.onEntitySelect(entity.GetSavableData());
	}
    }

    SelectTexture(src)
    {
	this.m_SelectedTexture = src.replace("/textures/","");
    }

    ApplyTexture()
    {
	this.m_ref_SelectedEntity.m_Components.RenderComponent.SetTexture(this.m_SelectedTexture);

	setTimeout(() =>
	{
	    this.m_EntityManipulator.FillMaterialEditor(this.m_SelectedTexture);
	}, 300);
    }

    OpenTextureBrowser()
    {
	$("#texture-select-modal").modal();
	if(this.m_TextureBrowserIndex === 0)
	{
	    this.LoadAndAppendTextureBrowserRow(0);
	    this.LoadAndAppendTextureBrowserRow(1);

	    this.m_TextureBrowserIndex = 1;
	}

	let container = $("#texture-browser-container");

	container.bind('scroll', () =>
	{
	   if (Math.round(container.scrollTop() + container.innerHeight(), 10) >=
Math.round(container[0].scrollHeight, 10))
	    {
		this.m_TextureBrowserIndex++;
		this.LoadAndAppendTextureBrowserRow(this.m_TextureBrowserIndex);
            }
	});
    }

    LoadAndAppendTextureBrowserRow(row)
    {
	let texture_URIs = AssetCache.TextureList.slice(row*4, (row*4)+4);
	if(texture_URIs.length === 0) { return; }
	let texture_tiles = [];

	texture_URIs.forEach(URI =>
	{
	    texture_tiles.push(whiskers.render(WHTML["texture-browser-image-tile"],
	    {
		ImageSrc: "/textures/" + URI.path
	    }));
	});

	$("#texture-browser-container").append(whiskers.render(WHTML["texture-browser-image-tile-row"],
	{
	    ImageTiles: texture_tiles
	}));
    }
}

window.Editor = {};
let EDITOR = window.Editor;

$(document).ready(() =>
{
    EDITOR = new Editor();
});
