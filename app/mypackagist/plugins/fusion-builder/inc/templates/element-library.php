<?php
/**
 * An underscore.js template.
 *
 * @package fusion-builder
 */

?>
<script type="text/template" id="fusion-builder-modules-template">
	<div class="fusion-builder-modal-top-container fusion-has-close-on-top">
		<h2 class="fusion-builder-settings-heading">
			{{ fusionBuilderText.select_element }}
			<input type="text" class="fusion-elements-filter" placeholder="{{ fusionBuilderText.search_elements }}" />
		</h2>
		<div class="fusion-builder-modal-close fusiona-plus2"></div>

		<ul class="fusion-tabs-menu">
			<# if ( 'undefined' !== typeof components && components.length && 0 < componentsCounter ) { #>
				<li class=""><a href="#template-elements">{{ fusionBuilderText.layout_section_elements }}</a></li>
			<# } #>
			<# if ( 'undefined' !== typeof form_components && form_components.length && 'fusion_form' === fusionBuilderConfig.post_type ) { #>
				<li class=""><a href="#form-elements">{{ fusionBuilderText.form_elements }}</a></li>
			<# } #>
			<li class=""><a href="#default-elements">{{ fusionBuilderText.builder_elements }}</a></li>
			<# if ( true !== FusionPageBuilderApp.shortcodeGenerator ) { #>
				<li class=""><a href="#custom-elements">{{ fusionBuilderText.library_elements }}</a></li>
			<# } #>
			<# if ( true === FusionPageBuilderApp.shortcodeGenerator ) { #>
				<li class=""><a href="#default-columns">{{ fusionBuilderText.columns }}</a></li>
			<# } #>
			<# if ( 'false' == FusionPageBuilderApp.innerColumn  && true !== FusionPageBuilderApp.shortcodeGenerator ) { #>
				<li class=""><a href="#inner-columns">{{ fusionBuilderText.inner_columns }}</a></li>
			<# } #>
			<# if ( '1' === fusionBuilderConfig.studio_status ) { #>
				<li><a href="#fusion-builder-elements-studio"><i class="fusiona-avada-logo"></i> <?php esc_html_e( 'Studio', 'fusion-builder' ); ?></a></li>
			<# } #>
		</ul>
	</div>

	<# const wooBadge = '<svg style="position: absolute; top: 0; right: 0;" width="45" height="31" viewBox="0 0 1509 1038" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M374.269 287H1134.97C1182.93 287 1221.99 326.061 1221.99 374.022V664.261C1221.99 712.222 1182.93 751.283 1134.97 751.283H862.039L899.369 843.003L734.472 751.283H374.022C326.061 751.283 287 712.222 287 664.261V374.022C287 326.061 326.061 287 374.269 287Z" fill="#7F54B3"/><path d="M334.219 366.056C340.153 358.886 348.806 354.436 358.2 354.189C377.483 352.953 388.608 362.1 391.575 381.631C403.442 461.236 416.297 528.975 429.894 584.6L513.703 425.389C521.367 411.05 530.761 403.386 542.381 402.645C559.192 401.409 569.575 412.039 573.778 434.784C581.689 479.284 593.803 523.042 609.872 565.317C620.008 468.406 636.819 398.195 660.306 354.931C665.003 345.042 674.644 338.614 685.522 338.12C694.175 337.378 702.828 340.098 709.503 345.784C716.425 350.975 720.628 359.134 721.122 367.786C721.617 374.214 720.38 380.642 717.414 386.081C702.58 413.77 690.219 459.753 680.578 524.031C671.183 586.084 667.475 634.786 669.947 669.645C670.936 678.298 669.205 686.95 665.497 694.614C661.789 702.525 653.878 707.964 645.225 708.459C635.089 709.2 625.2 704.503 615.064 694.367C579.464 658.025 551.281 603.884 530.514 531.942C506.039 580.892 487.497 617.728 475.383 641.956C452.886 685.22 433.603 707.223 417.781 708.459C407.397 709.2 398.497 700.548 391.328 682.253C371.797 632.314 350.783 535.65 328.286 392.261C326.308 382.867 328.533 373.473 334.219 366.056Z" fill="white"/><path d="M915.936 425.939C903.08 402.947 880.83 386.63 854.872 381.686C847.949 380.203 841.027 379.461 834.105 379.461C797.516 379.461 767.602 398.497 744.363 436.569C724.585 468.955 714.202 506.286 714.697 544.111C714.697 573.53 720.877 598.747 732.991 619.761C745.847 642.753 768.097 659.069 794.055 664.014C800.977 665.497 807.899 666.239 814.822 666.239C851.658 666.239 881.572 647.203 904.563 609.13C924.341 576.497 934.724 539.167 934.23 500.847C934.23 471.428 928.049 446.458 915.936 425.939ZM867.727 531.997C862.536 556.967 852.894 575.755 838.555 588.611C827.43 598.747 817.047 602.703 807.652 600.972C798.258 599.241 790.841 590.836 785.155 576.25C780.952 565.125 778.48 553.505 778.48 541.391C778.48 531.997 779.469 522.603 781.199 513.455C784.908 497.139 791.583 481.811 801.472 467.966C814.08 449.425 827.43 441.514 841.274 444.48C850.669 446.458 858.085 454.616 863.772 469.203C867.974 480.328 870.447 491.947 870.447 503.814C870.447 513.208 869.705 522.603 867.727 531.997Z" fill="white"/><path d="M1155.24 425.939C1142.39 402.947 1120.14 386.63 1094.18 381.686C1087.26 380.203 1080.34 379.461 1073.41 379.461C1036.83 379.461 1006.91 398.497 983.672 436.569C963.895 468.955 953.511 506.286 954.006 544.111C954.006 573.53 960.186 598.747 972.3 619.761C985.156 642.753 1007.41 659.069 1033.36 664.014C1040.29 665.497 1047.21 666.239 1054.13 666.239C1090.97 666.239 1120.88 647.203 1143.87 609.13C1163.65 576.497 1174.03 539.167 1173.54 500.847C1173.54 471.428 1167.36 446.458 1155.24 425.939ZM1107.04 531.997C1101.84 556.967 1092.2 575.755 1077.86 588.611C1066.74 598.747 1056.36 602.703 1046.96 600.972C1037.57 599.242 1030.15 590.836 1024.46 576.25C1020.26 565.125 1017.79 553.505 1017.79 541.391C1017.79 531.997 1018.78 522.603 1020.51 513.455C1024.22 497.139 1030.89 481.811 1040.78 467.966C1053.39 449.425 1066.74 441.514 1080.58 444.48C1089.98 446.458 1097.39 454.616 1103.08 469.203C1107.28 480.328 1109.76 491.947 1109.76 503.814C1109.76 513.208 1109.01 522.603 1107.04 531.997Z" fill="white"/></svg>'; #>

	<div class="fusion-builder-main-settings fusion-builder-main-settings-full has-group-options">
		<div class="fusion-builder-all-elements-container">
			<div class="fusion-tabs">

			<# if ( 'undefined' !== typeof components && components.length && 0 < componentsCounter ) { #>
				<div id="template-elements" class="fusion-tab-content">
					<ul class="fusion-builder-all-modules fusion-template-components fusion-clearfix">
						<# _.each( components, function( module ) { #>
							<#
							var additionalClass = false !== module.components_per_template && FusionPageBuilderViewManager.countElementsByType( module.label ) >= module.components_per_template ? ' fusion-builder-disabled-element' : '';

							// If element is not supposed to be active on page edit type, skip.
							if ( 'object' === typeof module.templates && ! module.templates.includes( fusionBuilderConfig.template_category ) ) {
								return false;
							}
							var components_per_template_tooltip = fusionBuilderText.template_max_use_limit + ' ' + module.components_per_template
							components_per_template_tooltip     = ( 2 > module.components_per_template ) ? components_per_template_tooltip + ' ' + fusionBuilderText.time : components_per_template_tooltip + ' ' + fusionBuilderText.times;
							components_per_template_tooltip = 'string' === typeof module.template_tooltip ? module.template_tooltip : components_per_template_tooltip;
							#>
							<li class="{{ module.label }} fusion-builder-element{{ additionalClass }}">
								<# console.log( module.title, module.title.indexOf( 'Woo' ) ); if ( -1 !== module.title.indexOf( 'Woo' ) ) { #>
									{{{ wooBadge }}}
								<# } #>									
								<h4 class="fusion_module_title">
									<# if ( 'undefined' !== typeof fusionAllElements[module.label].icon ) { #>
										<div class="fusion-module-icon {{ fusionAllElements[module.label].icon }}"></div>
									<# } #>
									{{{ module.title }}}
								</h4>
								<# if ( false !== module.components_per_template && FusionPageBuilderViewManager.countElementsByType( module.label ) >= module.components_per_template ) { #>
									<span class="fusion-tooltip">{{ components_per_template_tooltip }}</span>
								<# } #>
								<span class="fusion_module_label">{{ module.label }}</span>
							</li>
						<# } ); #>
					</ul>
			</div>
			<# } #>

			<# if ( 'undefined' !== typeof form_components && form_components.length && 'fusion_form' === fusionBuilderConfig.post_type ) { #>
				<div id="form-elements" class="fusion-tab-content">
					<ul class="fusion-builder-all-modules fusion-form-components fusion-clearfix">
						<# _.each( form_components, function( module ) { #>
							<li class="{{ module.label }} fusion-builder-element">
								<h4 class="fusion_module_title">
									<# if ( 'undefined' !== typeof fusionAllElements[module.label].icon ) { #>
										<div class="fusion-module-icon {{ fusionAllElements[module.label].icon }}"></div>
									<# } #>
									{{{ module.title }}}
								</h4>
								<span class="fusion_module_label">{{ module.label }}</span>
							</li>
						<# } ); #>
					</ul>
			</div>
			<# } #>

				<div id="default-elements" class="fusion-tab-content">
					<ul class="fusion-builder-all-modules">
						<# _.each( generator_elements, function( module ) { #>
							<#
							if ( 'fusion_form' === fusionBuilderConfig.post_type && 'fusion_form' === module.label ) {
								return;
							}
							if ( 'mega_menus' === fusionBuilderConfig.template_category && 'fusion_menu' === module.label ) {
								return;
							}
							if ( 'post_cards' === fusionBuilderConfig.template_category && 'fusion_post_cards' === module.label ) {
								return;
							}
							// If element is not supposed to be active on page edit type, skip.
							if ( 'object' === typeof module.templates && ! module.templates.includes( fusionBuilderConfig.template_category ) ) {
								return false;
							}
							#>
							<# var additionalClass = ( 'undefined' !== typeof module.generator_only ) ? ' fusion-builder-element-generator' : '';

								if ( false !== module.components_per_template && FusionPageBuilderViewManager.countElementsByType( module.label ) >= module.components_per_template ) {
									additionalClass += ' fusion-builder-disabled-element';
								}
							#>
							<li class="{{ module.label }} fusion-builder-element{{ additionalClass }}">
								<# console.log( module.title, module.title.indexOf( 'Woo' ) ); if ( -1 !== module.title.indexOf( 'Woo' ) ) { #>
									{{{ wooBadge }}}
								<# } #>									
								<h4 class="fusion_module_title">
									<# if ( 'undefined' !== typeof fusionAllElements[ module.label ].icon ) { #>
										<div class="fusion-module-icon {{ fusionAllElements[module.label].icon }}"></div>
									<# } #>
									{{{ module.title }}}
								</h4>
								<# if ( 'undefined' !== typeof module.generator_only ) { #>
									<span class="fusion-tooltip">{{ fusionBuilderText.generator_elements_tooltip }}</span>
								<# } #>

								<span class="fusion_module_label">{{ module.label }}</span>
							</li>
						<# } ); #>
					</ul>
				</div>
				<# if ( FusionPageBuilderApp.innerColumn == 'false' && FusionPageBuilderApp.shortcodeGenerator !== true ) { #>
					<div id="inner-columns" class="fusion-tab-content">
						<?php echo fusion_builder_inner_column_layouts(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</div>
				<# } #>
				<# if ( FusionPageBuilderApp.shortcodeGenerator === true ) { #>
					<div id="default-columns" class="fusion-tab-content">
						<?php echo fusion_builder_generator_column_layouts(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</div>
				<# } #>
				<# if ( '1' === fusionBuilderConfig.studio_status ) { #>
					<div id="fusion-builder-elements-studio" class="fusion-tab-content">
						<?php if ( function_exists( 'Avada' ) && Avada()->registration->is_registered() ) : ?>
							<div class="studio-wrapper">
								<aside>
									<ul></ul>
								</aside>
								<section>
									<div class="fusion-builder-element-content fusion-loader"><span class="fusion-builder-loader"></span><span class="awb-studio-import-status"></span></div>
									<ul class="studio-imports"></ul>
								</section>
								<?php AWB_Studio::studio_import_options_template(); ?>
							</div>
						<?php else : ?>
							<h2 class="awb-studio-not-reg"><?php esc_html_e( 'The product needs to be registered to access the Avada Studio.', 'fusion-builder' ); ?></h2>
						<?php endif; ?>
					</div>
				<# } #>
				<div id="custom-elements" class="fusion-tab-content"></div>
			</div>
		</div>
	</div>
</script>
