import { _otb_generate_uuid } from "../src/common/otb_id_generator";
import { COMPONENT_CLSID_PREFIXES } from "../src/common/otb_component_class_id_prefixes";

describe("otb id uuid generation function tests", () => {
    test('test otb id uuid generation', () => {
        let result = _otb_generate_uuid(20);
        console.log(result);
        expect(result).toBe(null);
    });

    test('test all clsids - otb arrow id uuid generation', () => {
        Object.values(COMPONENT_CLSID_PREFIXES).forEach(clsid => {
            // console.log("testing clsid: " + clsid);
            let result = _otb_generate_uuid(clsid);
            // console.log(result);
            expect(typeof result).toBe("string");
        });
    });

    test('test randomness of id generator', () => {
        let generated_ids = [];
        for(let i=0; i<10; i++)
        {
            let result = _otb_generate_uuid(COMPONENT_CLSID_PREFIXES.ARROW);
            expect(generated_ids.includes(result)).toBe(false);
            generated_ids.push(result);
        }
    });

    
});

