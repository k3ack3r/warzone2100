uniform vec4 color;
uniform sampler2D theTexture;

#if __VERSION__ >= 130
in vec2 uv;

out vec4 FragColor;
#else
varying vec2 uv;
#endif

void main()
{
	#if __VERSION__ >= 130
	vec4 texColour = texture(theTexture, uv) * color.a;
	FragColor = texColour * color;
	#else
	vec4 texColour = texture2D(theTexture, uv) * color.a;
	gl_FragColor = texColour * color;
	#endif

	// gl_FragData[1] apparently fails to compile for some people, see #4584.
	// GL::SC(Error:High) : 0:12(2): error: array index must be < 1
	//gl_FragData[0] = texColour * color;
	//gl_FragData[1] = texColour;
}
